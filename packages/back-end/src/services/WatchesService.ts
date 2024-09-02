import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Watches } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class WatchesService extends TypeOrmCrudService<Watches> {
  constructor(@InjectRepository(Watches) repo: Repository<Watches>) {
    super(repo);
  }
}
