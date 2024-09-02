import { DataSource, DataSourceOptions } from 'typeorm';
import {
  Users,
  Stocks,
  Watches,
} from './entities';
import * as dotenv from 'dotenv';
dotenv.config();

export const migrationsConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  legacySpatialSupport: false,
  logging: false,
  entities: [Users, Stocks, Watches],
  subscribers: [],
  migrations: [
    process.env.NODE_ENV == 'production'
      ? 'dist/migrations/*.js'
      : 'src/migrations/*{.ts,.js}',
  ],
  migrationsTableName: 'migrations_history',
};
export const AppDataSource = new DataSource(migrationsConfig);
