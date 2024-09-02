import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { UsersService } from '../services';

@Injectable()
export class IsUserGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const dbUser = await this.usersService.findById(user.userId);
    if(dbUser?.id){
      return true;
    }

    return false;
  }
}
