import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ServiceUnitsController } from './service-units.controller';
import { ServiceUnitsService } from './service-units.service';

@Module({
  imports: [PrismaModule],
  controllers: [ServiceUnitsController],
  providers: [ServiceUnitsService],
})
export class ServiceUnitsModule {}
