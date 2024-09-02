import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksService, UsersService } from '../services';
import { Stocks, Users, Watches } from '../entities';
import { StocksController } from '..//controllers';
import { StockSocketModule } from 'src/sockets/stock.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stocks, Users, Watches])],
  controllers: [StocksController],
  providers: [StocksService, UsersService, StockSocketModule],
  exports: [UsersService, StocksService]
})
export class StocksModule {}
