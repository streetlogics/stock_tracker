import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { UsersService, AuthService} from 'src/services';
import { Users } from 'src/entities';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService, 
    private usersService: UsersService,) {}

  @Post('register')
  async register(@Body() userDto: Partial<Users>) {
    const user = await this.usersService.create(userDto);
    const token = await this.authService.login(user);
    return { user, token };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
