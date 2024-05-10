import { Sequelize } from 'sequelize-typescript';

import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        database: process.env.DB_NAME as string,
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD as string,
      });
      sequelize.addModels([User]);
      // await sequelize.sync();
      await sequelize.sync({ alter: true });
      // await sequelize.sync({ force: true });

      return sequelize;
    },
  },
];
