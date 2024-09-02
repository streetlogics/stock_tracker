import { IsInt } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Users, Stocks } from './';

@Entity()
export class Watches {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.watches)
  user: Users;

  @Index() 
  @IsInt()
  @Column({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Stocks, (stock) => stock.watches)
  stock: Stocks;

  @Index() 
  @IsInt()
  @Column({ name: 'stockId' })
  stockId: number;

  @Column({ type: 'float' })
  purchasePrice: number;

  @Column({ type: 'int' })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Index()
  updatedAt: Date;
}
