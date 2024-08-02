import { IsString, IsOptional, IsDate, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateActivityDto {
  @IsString({ message: 'El tipo de actividad debe ser una cadena de texto.' })
  @IsOptional()
  activityType?: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsOptional()
  description?: string;

  @IsDate({ message: 'La fecha debe ser una fecha valida.' })
  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @IsNumber({}, { message: 'El ID de la mascota debe ser un número.' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor a 0.' })
  @IsOptional()
  petId?: number;
}
