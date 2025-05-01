import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from '@prisma/client';
import { JwtPayloadWithRole } from '../types/jwt-payload';

const DEFAULT_ALLOWED_ROLES = [Role.ADMIN, Role.SUPER_ADMIN];

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<Role[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]) ?? DEFAULT_ALLOWED_ROLES;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayloadWithRole;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
