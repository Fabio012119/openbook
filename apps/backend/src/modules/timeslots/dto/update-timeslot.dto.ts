import { IsISO8601, IsOptional } from 'class-validator';

export class UpdateTimeSlotDto {
  @IsISO8601() @IsOptional() startTime?: string;
  @IsISO8601() @IsOptional() endTime?: string;
}
