import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PublicWidgetController } from './public-widget.controller';
import { AllowedOriginGuard } from '../../guards/allowed-origin.guard';

@Module({
  imports: [PrismaModule],
  controllers: [PublicWidgetController],
  providers: [AllowedOriginGuard],
})
export class PublicWidgetModule {}
