import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class WidgetsService {
  constructor(private prisma: PrismaService) {}

  /* ---- CREATE ---- */
  async create(dto: CreateWidgetDto): Promise<void> {
    try {
      await this.prisma.widget.create({
        data: {
          serviceUnitId: dto.serviceUnitId,
          allowedOrigins: dto.allowedOrigins,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003')
          throw new BadRequestException('Service-unit not found');
        if (err.code === 'P2002')
          throw new ConflictException(
            'Widget already exists for that service-unit',
          );
      }
      throw err;
    }
  }

  /* ---- LIST ---- */
  list(serviceUnitId?: string) {
    return this.prisma.widget.findMany({
      where: serviceUnitId ? { serviceUnitId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  /* ---- READ ---- */
  async findOne(id: string) {
    const w = await this.prisma.widget.findUnique({ where: { id } });
    if (!w) throw new NotFoundException('Widget not found');
    return w;
  }

  /* ---- UPDATE ---- */
  async update(id: string, dto: UpdateWidgetDto): Promise<void> {
    try {
      await this.prisma.widget.update({
        where: { id },
        data: {
          allowedOrigins: dto.allowedOrigins ?? undefined,
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      )
        throw new NotFoundException('Widget not found');
      throw err;
    }
  }

  /* ---- DELETE ---- */
  async delete(id: string): Promise<void> {
    try {
      await this.prisma.widget.delete({ where: { id } });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      )
        throw new NotFoundException('Widget not found');
      throw err;
    }
  }
}
