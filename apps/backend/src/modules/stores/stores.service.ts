import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStoreDto) {
    try {
      return await this.prisma.store.create({ data: dto });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException('Store name already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async list() {
    return this.prisma.store.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const store = await this.prisma.store.findUnique({ where: { id } });
    if (!store) throw new NotFoundException('Store not found');
    return store;
  }

  async update(id: string, dto: UpdateStoreDto) {
    try {
      return await this.prisma.store.update({
        where: { id },
        data: dto,
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException('Store not found');
      }
      throw err;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.store.delete({
        where: { id },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        // record not found
        throw new NotFoundException('Store not found');
      }

      // If the store still has linked ServiceUnits (FK constraint) Prisma will
      // throw P2003.  Choose one:
      //   • cascade delete (set `onDelete: Cascade` in schema + migrate)
      //   • or block deletion until ServiceUnits are removed.
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2003'
      ) {
        throw new BadRequestException(
          'Remove all service-units (or set CASCADE) before deleting this store',
        );
      }

      throw err;
    }
  }
}
