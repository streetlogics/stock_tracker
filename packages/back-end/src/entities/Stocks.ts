import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from 'typeorm';
import { Watches } from './Watches';

@Entity()
export class Stocks {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['symbol'])
  @Column()
  symbol: string;

  @Column({ type: 'float', default: 0 })
  latestPrice: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Index()
  updatedAt: Date;

  @OneToMany(() => Watches, (watch) => watch.stock)
  watches: Watches[];
}
