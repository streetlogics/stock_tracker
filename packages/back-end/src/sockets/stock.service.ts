import { Injectable } from '@nestjs/common';
import { StockGateway } from './stock.gateway';

@Injectable()
export class StockService {
  constructor(private stockGateway: StockGateway) {}
}