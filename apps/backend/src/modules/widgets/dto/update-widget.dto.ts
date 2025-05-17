import { IsArray, ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateWidgetDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  allowedOrigins?: string[];
}
