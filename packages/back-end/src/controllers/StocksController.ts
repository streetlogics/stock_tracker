import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Stocks } from '../entities/Stocks';
import { StocksService } from '../services';
import { JwtAuthGuard } from '../jwt.auth.guard';
import { IsUserGuard } from '../guards'; 

@Crud({
  model: {
    type: Stocks,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
})
@Controller('stocks')
@UseGuards(JwtAuthGuard, IsUserGuard)
export class StocksController implements CrudController<Stocks> {
  constructor(public service: StocksService) {}
}