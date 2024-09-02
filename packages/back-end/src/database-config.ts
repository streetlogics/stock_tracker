import { DataSourceOptions } from 'typeorm';
import {
  Stocks,
  Users,
  Watches,
} from './entities';
import * as dotenv from 'dotenv';
dotenv.config();

export const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4_unicode_ci',
  legacySpatialSupport: false,
  logging: true,
  entities: [ Users, Stocks, Watches ],
  subscribers: [],
};
