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
import { WidgetsService } from './widgets.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('admin/widgets')
export class WidgetsController {
  constructor(private readonly widgetService: WidgetsService) {}

  @Post()
  async create(@Body() dto: CreateWidgetDto) {
    await this.widgetService.create(dto);
    return { message: 'Successfully created widget' };
  }

  @Get()
  list(@Query('serviceUnitId') serviceUnitId?: string) {
    return this.widgetService.list(serviceUnitId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.widgetService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateWidgetDto) {
    await this.widgetService.update(id, dto);
    return { message: `Successfully updated widget with id ${id}` };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.widgetService.delete(id);
    return { message: `Successfully deleted widget with id ${id}` };
  }
}
