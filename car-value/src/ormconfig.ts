import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

const dbConfig = {
  synchronize: false,
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
        entities: [User, Report],
      } as DataSourceOptions;
    case 'test':
      return {
        ...dbConfig,
        type: 'sqlite',
        database: 'test.sqlite',
        entities: [User, Report],
      } as DataSourceOptions;
    case 'production':
    default:
      throw new Error(
        'Unknown environment, unable to determine database configuration',
      );
  }
};

export const AppDataSource = new DataSource(configGenerator());
