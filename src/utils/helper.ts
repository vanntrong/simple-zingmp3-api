import { User } from '@/modules/users/users.type';
import { omit } from 'lodash';

export const toUserResponse = (user: User) => {
  return omit(user, ['password', 'is_deleted']);
};
