import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../entities';
import { UsersService } from './';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: Users = await this.usersService.findOneByEmail(email);
    if (user && (await user.validatePassword(password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Users) {
    const payload = {
      email: user.email,
      userId: user.id
    };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
