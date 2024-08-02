import { IsString, IsNotEmpty, IsDate, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConsultationDto {
  @IsString({ message: 'El nombre del veterinario debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del veterinario no puede estar vacío.' })
  veterinarian: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  description: string;

  @IsDate({ message: 'La fecha debe ser una fecha valida.' })
  @IsNotEmpty({ message: 'La fecha no puede estar vacía.' })
  @Type(() => Date)
  date: Date;

  @IsNumber({}, { message: 'El ID de la mascota debe ser un número.' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor a 0.' })
  petId: number;
}
