import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  Users,
  Stocks,
  Watches
} from './entities';
import { config } from './database-config';
import {
  UsersService,
  StocksService,
  WatchesService
} from './services';
import { AuthModule } from './modules/AuthModule';
import { UsersModule, StocksModule, WatchesModule } from './modules';
import {
  IsUserGuard,
} from './guards';
import { ScheduleModule } from '@nestjs/schedule';
import { StocksUpdateTask } from './tasks/StocksUpdateTask';
import { StockSocketModule } from './sockets/stock.module';
import { StockGateway } from './sockets/stock.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([
      Users,
      Stocks,
      Watches
    ]),
    AuthModule,
    UsersModule,
    StocksModule,
    WatchesModule,
    ScheduleModule.forRoot(),
    StockSocketModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    IsUserGuard,
    AppService,
    UsersService,
    StocksService,
    WatchesService,
    StocksUpdateTask,
    StockGateway
  ],
  exports: [
    IsUserGuard,
    UsersService,
    StocksService,
    WatchesService,
  ],
})
export class AppModule {}
