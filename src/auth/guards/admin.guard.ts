import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ACCESS_RIGHTS_ERROR } from './../../common/constants/errors.constants';
import { User } from './../../user/schemas/user.schema';
import { Reflector } from '@nestjs/core';

export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user.roles.includes('admin')) {
      throw new ForbiddenException(ACCESS_RIGHTS_ERROR);
    }

    return true;
  }
}
