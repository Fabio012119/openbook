import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateServiceUnitDto {
  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() description?: string;
  @IsNumber() @IsOptional() durationMins?: number;
  @IsNumber() @IsOptional() pricePerBooking?: number;
}
