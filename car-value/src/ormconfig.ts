import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

const dbConfig = {
  synchronize: false,
  entities: [User, Report],
  migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

const configGenerator = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        ...dbConfig,
        type: 'sqlite',
        database: 'db.sqlite',
      } as DataSourceOptions;
    case 'test':
      return {
        ...dbConfig,
        type: 'sqlite',
        database: 'test.sqlite',
        migrationsRun: true,
      } as DataSourceOptions;
    case 'production':
      return {
        ...dbConfig,
        type: 'postgres',
        url: process.env.DATABASE_URL,
        migrationsRun: true,
        ssl: {
          rejectUnauthorized: false,
        },
      } as DataSourceOptions;
    default:
      throw new Error(
        'Unknown environment, unable to determine database configuration',
      );
  }
};

export const AppDataSource = new DataSource(configGenerator());
