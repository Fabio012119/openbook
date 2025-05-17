import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTimeSlotDto } from './dto/create-timeslot.dto';
import { UpdateTimeSlotDto } from './dto/update-timeslot.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TimeSlotsService {
  constructor(private prisma: PrismaService) {}

  /* ---- CREATE ---- */
  async create(dto: CreateTimeSlotDto): Promise<void> {
    const { startTime, endTime, ...rest } = dto;

    if (new Date(startTime) >= new Date(endTime)) {
      throw new BadRequestException('startTime must be before endTime');
    }

    try {
      await this.prisma.timeslot.create({
        data: {
          ...rest,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003')
          throw new BadRequestException('ServiceUnit not found');
        if (err.code === 'P2002')
          throw new ConflictException(
            'Timeslot already exists for that startTime',
          );
      }
      throw err;
    }
  }

  /* ---- LIST ---- */
  list(serviceUnitId?: string) {
    return this.prisma.timeslot.findMany({
      where: serviceUnitId ? { serviceUnitId } : undefined,
      orderBy: { startTime: 'asc' },
    });
  }

  /* ---- READ ---- */
  async findOne(id: string) {
    const slot = await this.prisma.timeslot.findUnique({ where: { id } });
    if (!slot) throw new NotFoundException('Timeslot not found');
    return slot;
  }

  /* ---- UPDATE ---- */
  async update(id: string, dto: UpdateTimeSlotDto): Promise<void> {
    if (
      dto.startTime &&
      dto.endTime &&
      new Date(dto.startTime) >= new Date(dto.endTime)
    )
      throw new BadRequestException('startTime must be before endTime');

    try {
      await this.prisma.timeslot.update({
        where: { id },
        data: {
          startTime: dto.startTime ? new Date(dto.startTime) : undefined,
          endTime: dto.endTime ? new Date(dto.endTime) : undefined,
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      )
        throw new NotFoundException('Timeslot not found');
      throw err;
    }
  }

  /* ---- DELETE ---- */
  async delete(id: string): Promise<void> {
    try {
      await this.prisma.timeslot.delete({ where: { id } });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      )
        throw new NotFoundException('Timeslot not found');
      throw err;
    }
  }
}
