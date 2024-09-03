import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockGateway } from './stock.gateway';

@Module({
  providers: [StockService, StockGateway],
  exports: [StockService],
})
export class StockSocketModule {}