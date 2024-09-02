import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watches, Users, Stocks } from '../entities';
import { StocksService, UsersService, WatchesService } from 'src/services';
import { WatchesController } from 'src/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Watches, Users, Stocks])],
  controllers: [WatchesController],
  providers: [WatchesService, UsersService, StocksService],
  exports: [UsersService, WatchesService]
})
export class WatchesModule {}
