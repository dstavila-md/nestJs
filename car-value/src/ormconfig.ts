import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

const dbConfig = {
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: false,
  entities: [User, Report],
} as DataSourceOptions;

export const AppDataSource = new DataSource(dbConfig);
