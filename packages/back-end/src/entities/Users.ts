import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  Index,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsString } from 'class-validator';
import { Stocks } from './Stocks';
import { Watches } from './Watches';


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @Index() // Index for better performance on email queries
  @IsEmail()
  @Column()
  email: string;

  @Column()
  password: string;

  new_password: string;

  @OneToMany(() => Watches, (watch) => watch.user)
  watches: Watches[];

  @BeforeInsert()
  async createPassword(): Promise<void> {
    await this.hashPassword(this.password);
  }

  @BeforeUpdate()
  async updatePassword(): Promise<void> {
    if (this.new_password) {
      await this.hashPassword(this.new_password);
    }
  }

  async hashPassword(password): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
