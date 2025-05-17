import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'modules/auth/auth.module';
import { AdminModule } from 'modules/admin/admin.module';
import { StoresModule } from 'modules/stores/stores.module';
import { ServiceUnitsModule } from 'modules/service-units/service-unit.module';
import { TimeSlotsModule } from 'modules/timeslots/timeslots.module';
import { WidgetsModule } from 'modules/widgets/widgets.module';
import { PublicWidgetModule } from 'modules/public-widget/public-widget.module';

@Module({
  imports: [
    PrismaModule,
    AdminModule,
    AuthModule,
    StoresModule,
    ServiceUnitsModule,
    TimeSlotsModule,
    WidgetsModule,
    PublicWidgetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
