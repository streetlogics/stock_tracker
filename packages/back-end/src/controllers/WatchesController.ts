import { Controller, UseGuards, Req, ForbiddenException, Get } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody } from '@dataui/crud';
import { Watches } from '../entities/Watches';
import { StocksService, WatchesService } from '../services';
import { JwtAuthGuard } from '../jwt.auth.guard'; // Import your JwtAuthGuard
import { IsUserGuard } from '../guards/UserGuard'; // Import your custom guard

@Crud({
  model: {
    type: Watches,
  },
  routes: {
    only: ['createOneBase', 'getManyBase', 'getOneBase','updateOneBase', 'deleteOneBase'], // Limit to the necessary routes
  },
  query: {
    join: {
      user: {
        eager: false,
      },
      stock: {
        required: true,
        eager: true,
      }
    },
  },
})
@Controller('watches')
@UseGuards(JwtAuthGuard, IsUserGuard)
export class WatchesController implements CrudController<Watches> {
  constructor(public service: WatchesService, public stocksService: StocksService) {}

  async createNewStock(req: CrudRequest, request: any,symbol: string, dto: Watches) {
    const newStock = await this.stocksService.createStock(request.body.symbol);

    // try to get latest price on create
    await this.stocksService.fetchLatestPrice(newStock.symbol);
    dto.stock = newStock;
  }

  @Get('latest-prices')
  async getLatestPrices(@Req() request: any) {
    const userId = request.user.userId;
    const userWatches = await this.service.find({
      where: { user: { id: userId } },
      relations: ['stock']
    });

    // Fetch the latest price for each watch using the IEX endpoint
    const latestPrices = await Promise.all(
      userWatches.map(async (watch) => {
        return {
          symbol: watch.stock.symbol,
          price: watch.stock.latestPrice,
          date: watch.stock.updatedAt,
          quantity: watch.quantity,
          purchasePrice: watch.purchasePrice,
        };
      })
    );

    return { latestPrices };
  }
  

  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest, @Req() request: any) {
    // Restrict results to the current user's watches
    const userId = request.user.userId;
    req.parsed.search = {
      $and: [{ userId: { $eq: userId } }],
    };

    return this.service.getMany(req);
  }

  @Override('getOneBase')
  async getOne(@ParsedRequest() req: CrudRequest, @Req() request: any) {
    const userId = request.user.userId;
    req.parsed.search = {
      $and: [{ 
        id: { $eq: req.parsed.paramsFilter[0].value },
        userId: { $eq: userId } }],
    };
    return this.service.getOne(req);
  }

  @Override('createOneBase')
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Watches, @Req() request: any) {
    // Always use the current user's ID for watch creation
    const userId = request.user.userId;
    dto.user = { id: userId } as any;
    const stock = await this.stocksService.findOne({ where: { symbol: request.body.symbol } });
    
    // create stock if it doesn't exist
    if(!stock) {
      await this.createNewStock(req, request, request.body.symbol, dto);
    } else {
      dto.stock = stock;
    }
    return this.service.createOne(req, dto);
  }

  @Override('updateOneBase')
  async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Watches, @Req() request: any) {
    // Ensure the current user can only update their own watches
    const userId = request.user.userId; 

    // Check if the watch belongs to the current user
    const watch = await this.service.findOne({ where: { id: req.parsed.paramsFilter[0].value, userId: userId } });
    if (!watch || watch.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this watch');
    }

    // create stock if it doesn't exist
    const stock = await this.stocksService.findOne({ where: { symbol: request.body.symbol } });
    if(!stock) {
      await this.createNewStock(req, request, request.body.symbol, dto);
    } else {
      dto.stock = stock;
    }
    return this.service.updateOne(req, dto);
  }

  @Override('deleteOneBase')
  async deleteOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Watches, @Req() request: any) {
    // Ensure the current user can only update their own watches
    const userId = request.user.userId; 

    // Check if the watch belongs to the current user
    const watch = await this.service.findOne({ where: { id: req.parsed.paramsFilter[0].value, userId: userId } });
    if (!watch || watch.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this watch');
    }

    return this.service.deleteOne(req);
  }
}