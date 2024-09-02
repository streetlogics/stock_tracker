import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../local.strategy';
import { jwtConstants } from '../constants';
import { JwtStrategy } from '../jwt.strategy';
import { JwtAuthGuard } from '../jwt.auth.guard';
import { IsUserGuard } from '../guards';
import { AuthService } from '../services';
import { AuthController } from '../controllers';
import { UsersModule } from './';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard, IsUserGuard],
  exports: [JwtAuthGuard, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
