import { IsArray, ArrayNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateWidgetDto {
  @IsUUID()
  serviceUnitId!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  allowedOrigins!: string[];
}
