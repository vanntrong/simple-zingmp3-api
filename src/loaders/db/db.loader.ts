import { config } from '@/config';
import { Logger, Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Module({
  providers: [
    {
      provide: config.DB.MODULE_NAME,
      useFactory: async (): Promise<Db> => {
        try {
          const logger = new Logger('DB');
          logger.log(
            'Connecting to DB...' +
              `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
          );
          const client = await MongoClient.connect(
            `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
          );

          logger.log('Connected to database');

          return client.db(config.DB.NAME);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
  ],
  exports: [config.DB.MODULE_NAME],
})
export class DBModule {}
