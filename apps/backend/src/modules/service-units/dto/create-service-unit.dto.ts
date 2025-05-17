import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateServiceUnitDto {
  @IsUUID()
  storeId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsNumber()
  durationMins!: number;

  @IsNumber()
  pricePerBooking!: number;
}
