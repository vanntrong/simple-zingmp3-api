import { AppError } from '@/errors/AppError';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Collection } from 'mongodb';
import { UsersModel } from '../users/users.model';
import { User, UserResponse } from '../users/users.type';
import { LoginDto, SignUpDto } from './auth.dto';
import * as bcryptjs from 'bcryptjs';
import { toUserResponse } from '@/utils/helper';
import { ResponseType, TokenResponse } from '@/types/common';
import { JwtService } from '@nestjs/jwt';
import { pick } from 'lodash';
import { config } from '@/config';

@Injectable()
export class AuthService {
  private readonly userCollection: Collection<User>;
  private readonly logger: Logger;

  constructor(private usersModel: UsersModel, private jwtService: JwtService) {
    this.userCollection = this.usersModel.collection;
    this.logger = new Logger(AuthService.name);
  }

  hashPassword(password: string) {
    return bcryptjs.hashSync(password, 10);
  }

  validatePassword(password: string, hashedPassword: string) {
    return bcryptjs.compareSync(password, hashedPassword);
  }

  async genToken(payload: User) {
    try {
      const fieldToSign = pick(payload, ['_id', 'full_name', 'email']);

      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(fieldToSign, {
          secret: config.ACCESS_TOKEN_SECRET,
          expiresIn: config.ACCESS_TOKEN_LIFE,
          algorithm: 'HS256',
        }),
        this.jwtService.signAsync(fieldToSign, {
          secret: config.REFRESH_TOKEN_SECRET,
          expiresIn: config.REFRESH_TOKEN_LIFE,
          algorithm: 'HS256',
        }),
      ]);

      return {
        access_token,
        refresh_token,
        exp: config.ACCESS_TOKEN_LIFE,
      };
    } catch (error) {
      this.logger.error('Gen token error', error);
      return null;
    }
  }

  async signup(
    payload: SignUpDto,
  ): Promise<ResponseType<UserResponse & { tokens: TokenResponse }>> {
    const isDuplicate = !!(await this.userCollection.countDocuments({
      email: payload.email,
    }));

    if (isDuplicate) {
      throw new AppError('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = this.hashPassword(payload.password);

    const user: User = {
      ...payload,
      avatar: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
      password: hashedPassword,
      is_deleted: false,
      created_at: new Date(),
    };

    const { acknowledged } = await this.userCollection.insertOne(user);

    if (!acknowledged) {
      this.logger.error(`Failed to insert user ${user.email}`);
      throw new AppError(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const tokens = await this.genToken(user);

    this.logger.log(`User signed up:::${user.email}`);
    return {
      data: { ...toUserResponse(user), tokens: tokens },
    };
  }

  async login(
    payload: LoginDto,
  ): Promise<ResponseType<UserResponse & { tokens: TokenResponse }>> {
    const user = await this.userCollection.findOne({
      email: payload.email,
      is_deleted: false,
    });

    if (!user) {
      throw new AppError(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = this.validatePassword(payload.password, user.password);

    if (!isMatch) {
      throw new AppError(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokens = await this.genToken(user);

    this.logger.log(`User login:::${user.email}`);
    return {
      data: { ...toUserResponse(user), tokens: tokens },
    };
  }
}
