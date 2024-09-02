import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stocks } from '../entities';
import { Repository } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class StocksService extends TypeOrmCrudService<Stocks> {
  constructor(
    @InjectRepository(Stocks) repo: Repository<Stocks>,
    private schedulerRegistry: SchedulerRegistry
  ) {
    super(repo);
  }

  async fetchLatestPrice(symbol: string) {
    const tiingoApiKey = process.env.TIINGO_KEY;
    if (!tiingoApiKey) {
      throw new Error('API key for Tiingo is not set.');
    }

    const iexApiUrl = `https://api.tiingo.com/iex/${symbol}?token=${tiingoApiKey}`;

    try {
      const response = await fetch(iexApiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch price for ${symbol}: ${response.statusText}`);
      }

      const data = await response.json();
      const latestPrice = {
        price: data[0]?.last,
        date: data[0]?.timestamp,
      };

      // Update the stock in the database with the latest price
      const stock = await this.findOne({ where: { symbol } });
      if (stock && latestPrice?.price) {
        await this.updateStock(symbol, latestPrice.price, new Date(latestPrice.date));
      }

      return latestPrice;
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error);
      return null; // Return null if there was an error fetching the price
    }
  }

  async createStock(symbol: string) {
    return this.repo.save({ symbol: symbol.toUpperCase() });
  }

  async updateStock(symbol: string, latestPrice: number, updatedAt: Date) {
    return this.repo.update({ symbol: symbol.toUpperCase() }, { latestPrice, updatedAt });
  }

  async updateAllStocks() {
    const stocks = await this.repo.find();
    for (const stock of stocks) {
      await this.fetchLatestPrice(stock.symbol);
    }
    return await this.repo.find();
  }
}