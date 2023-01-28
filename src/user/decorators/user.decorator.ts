import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserModel } from '../schemas/user.schema';

export type TypeData = keyof UserModel;

export const User = createParamDecorator(
  (data: TypeData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
