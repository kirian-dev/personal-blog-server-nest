import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { TypeRole } from './../auth.interface';
import { Role } from 'src/common/enums/roles.enum';
export const Auth = (role: TypeRole = Role.User) =>
  applyDecorators(
    role === Role.Admin
      ? UseGuards(JwtAuthGuard, AdminGuard)
      : UseGuards(JwtAuthGuard),
  );
