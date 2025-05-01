import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminService } from './admin.service';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.SUPER_ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('users')
  async createUser(@Body() dto: CreateUserDto) {
    return this.adminService.createUser(dto);
  }

  @Get('users')
  async listUsers() {
    return this.adminService.listUsers();
  }
}
