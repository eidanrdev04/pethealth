import { IsString, IsOptional, IsDate, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTreatmentDto {
  @IsString({ message: 'El nombre del tratamiento debe ser una cadena de texto.' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'La descripción del tratamiento debe ser una cadena de texto.' })
  @IsOptional()
  description?: string;

  @IsDate({ message: 'La fecha de inicio debe ser una fecha valida.' })
  @IsOptional()
  @Type(() => Date) 
  startDate?: Date;

  @IsDate({ message: 'La fecha de finalización debe ser una fecha valida.' })
  @IsOptional()
  @Type(() => Date) 
  endDate?: Date;

  @IsNumber({}, { message: 'El ID de la mascota debe ser un número.' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor a 0.' })
  @IsOptional()
  petId?: number;
}
