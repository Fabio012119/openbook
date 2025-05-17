import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceUnitDto } from './dto/create-service-unit.dto';
import { UpdateServiceUnitDto } from './dto/update-service-unit.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceUnitsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServiceUnitDto): Promise<void> {
    try {
      await this.prisma.serviceUnit.create({ data: dto });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003')
          throw new BadRequestException('Store not found');
        if (err.code === 'P2002')
          throw new ConflictException('Service-unit name already exists');
      }
      throw err;
    }
  }

  list(storeId?: string) {
    return this.prisma.serviceUnit.findMany({
      where: storeId ? { storeId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const unit = await this.prisma.serviceUnit.findUnique({ where: { id } });
    if (!unit) throw new NotFoundException('Service-unit not found');
    return unit;
  }

  async update(id: string, dto: UpdateServiceUnitDto): Promise<void> {
    try {
      await this.prisma.serviceUnit.update({ where: { id }, data: dto });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      )
        throw new NotFoundException('Service-unit not found');
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.serviceUnit.delete({ where: { id } });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      )
        throw new NotFoundException('Service-unit not found');
      throw err;
    }
  }
}
