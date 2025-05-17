import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class AllowedOriginGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const widgetId = req.params['id'];

    if (!widgetId) throw new BadRequestException('Widget id missing');

    const widget = await this.prisma.widget.findUnique({
      where: { id: widgetId },
      select: { allowedOrigins: true },
    });
    if (!widget) throw new BadRequestException('Widget not found');

    const origin = req.get('origin') ?? req.get('referer') ?? '';

    const origins: string[] = Array.isArray(widget.allowedOrigins)
      ? widget.allowedOrigins.filter((v): v is string => typeof v === 'string')
      : [];

    const pass =
      origins.includes('*') || origins.some((o) => origin.startsWith(o));

    if (!pass) throw new ForbiddenException('Origin not allowed');
    return true;
  }
}
