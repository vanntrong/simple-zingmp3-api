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
          const client = await MongoClient.connect(
            `mongodb://${config.DB.HOST}:${config.DB.PORT}`,
          );

          logger.log('Connected to database');

          return client.db(config.DB.NAME);
        } catch (error) {
          throw error;
        }
      },
    },
  ],
  exports: [config.DB.MODULE_NAME],
})
export class DBModule {}
