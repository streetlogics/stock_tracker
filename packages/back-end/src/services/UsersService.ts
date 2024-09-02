import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Users } from '../entities';

@Injectable()
export class UsersService extends TypeOrmCrudService<Users> {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {
    super(usersRepository);
  }

  async create(userData: Partial<Users>): Promise<Users> {
    const user = new Users();
    Object.assign(user, userData);
    return await this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<Users | null> {
    const options: FindOneOptions<Users> = {
      where: { email },
    };
    return await this.usersRepository.findOne(options);
  }

  async findById(id: number): Promise<Users | null> {
    const options: FindOneOptions<Users> = {
      where: { id }
    };
    return await this.usersRepository.findOne(options);
  }
}
