import { IsUUID, IsISO8601 } from 'class-validator';

export class CreateTimeSlotDto {
  @IsUUID()
  serviceUnitId!: string;

  @IsISO8601()
  startTime!: string;

  @IsISO8601()
  endTime!: string;
}
