import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TimeSlotsController } from './timeslots.controller';
import { TimeSlotsService } from './timeslots.service';

@Module({
  imports: [PrismaModule],
  controllers: [TimeSlotsController],
  providers: [TimeSlotsService],
})
export class TimeSlotsModule {}
