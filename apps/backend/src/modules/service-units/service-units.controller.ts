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
import { ServiceUnitsService } from './service-units.service';
import { CreateServiceUnitDto } from './dto/create-service-unit.dto';
import { UpdateServiceUnitDto } from './dto/update-service-unit.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('admin/service-units')
export class ServiceUnitsController {
  constructor(private readonly suService: ServiceUnitsService) {}

  @Post()
  async create(@Body() dto: CreateServiceUnitDto) {
    await this.suService.create(dto);
    return { message: 'Successfully created service unit' };
  }

  @Get()
  list(@Query('storeId') storeId?: string) {
    return this.suService.list(storeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateServiceUnitDto) {
    await this.suService.update(id, dto);
    return { message: `Successfully updated service unit with id ${id}` };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.suService.delete(id);
    return { message: `Successfully deleted service unit with id ${id}` };
  }
}
