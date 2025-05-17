import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('admin/stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @Post()
  async create(@Body() dto: CreateStoreDto) {
    await this.storesService.create(dto);
    return { message: 'Successfully created store' };
  }

  @Get()
  list() {
    return this.storesService.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateStoreDto) {
    await this.storesService.update(id, dto);
    return {
      message: `Successfully updated store with id ${id}`,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.storesService.delete(id);
    return {
      message: `Successfully deleted store with id ${id}`,
    };
  }
}
