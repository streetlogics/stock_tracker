// users.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services';
import { Users } from '../entities';
import { AuthModule } from './AuthModule';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), forwardRef(() => AuthModule)],
  providers: [UsersService],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
