import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TimeSlotsService } from './timeslots.service';
import { CreateTimeSlotDto } from './dto/create-timeslot.dto';
import { UpdateTimeSlotDto } from './dto/update-timeslot.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('admin/timeslots')
export class TimeSlotsController {
  constructor(private readonly tsService: TimeSlotsService) {}

  @Post()
  async create(@Body() dto: CreateTimeSlotDto) {
    await this.tsService.create(dto);
    return { message: 'Successfully created timeslot' };
  }

  @Get()
  list(@Query('serviceUnitId') serviceUnitId?: string) {
    return this.tsService.list(serviceUnitId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTimeSlotDto) {
    await this.tsService.update(id, dto);
    return { message: `Successfully updated timeslot with id ${id}` };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tsService.delete(id);
    return { message: `Successfully deleted timeslot with id ${id}` };
  }
}
