import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StocksService } from '../services/StocksService';
import { StockGateway } from '../sockets/stock.gateway';

@Injectable()
export class StocksUpdateTask {
  constructor(
    private readonly stocksService: StocksService,
    private readonly stockGateway: StockGateway
  ) {}

  @Cron('*/1 * * * *') // Runs every minute
  async handleCron() {
    console.log('Running stock update task');
    try {
      const updatedStocks = await this.stocksService.updateAllStocks();
      
      // Send the updated stocks through WebSocket
      this.stockGateway.sendStockUpdate(updatedStocks);
      
      console.log('Stock prices updated successfully');
    } catch (error) {
      console.error('Error updating stock prices:', error);
    }
  }
}