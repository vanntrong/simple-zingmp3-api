import { AppError } from '@/errors/AppError';
import { ResponseType } from '@/types/common';
import { toUserResponse } from '@/utils/helper';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { UsersModel } from './users.model';
import { User, UserResponse } from './users.type';

@Injectable()
export class UsersService {
  private readonly userCollection: Collection<User>;
  private readonly logger: Logger;

  constructor(private userModel: UsersModel) {
    this.userCollection = this.userModel.collection;
    this.logger = new Logger(UsersService.name);
  }

  async getById(id: string): Promise<ResponseType<UserResponse>> {
    try {
      const user = await this.userCollection.findOne({ _id: new ObjectId(id) });
      if (!user) {
        throw new AppError('User not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Get me::${id}`);
      return {
        data: toUserResponse(user),
      };
    } catch (error) {
      this.logger.error('Get me error', error);
      throw error;
    }
  }
}
