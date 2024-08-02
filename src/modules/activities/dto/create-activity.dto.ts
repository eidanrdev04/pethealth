import { IsString, IsNotEmpty, IsDate, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateActivityDto {
  @IsString({ message: 'El tipo de actividad debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El tipo de actividad no puede estar vacío.' })
  activityType: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  description: string;

  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La fecha no puede estar vacía.' })
  @Type(() => Date)
  date: Date;

  @IsNumber({}, { message: 'El ID de la mascota debe ser un número.' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor a 0.' })
  petId: number;
}
