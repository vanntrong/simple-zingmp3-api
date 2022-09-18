import { config } from '@/config';
import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { User } from './users.type';

@Injectable()
export class UsersModel {
  private readonly _collection: Collection<User>;
  constructor(@Inject(config.DB.MODULE_NAME) private db: Db) {
    this._collection = this.db.collection<User>(config.DB.COLLECTIONS.USERS);

    // Create index
    this._collection.createIndex({ email: 1, _id: 1 }, { unique: true });
  }

  public get collection(): Collection<User> {
    return this._collection;
  }
}
