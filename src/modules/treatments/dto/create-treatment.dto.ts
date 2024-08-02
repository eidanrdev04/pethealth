import { IsString, IsNotEmpty, IsDate, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTreatmentDto {
  @IsString({ message: 'El nombre del tratamiento debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del tratamiento no puede estar vacío.' })
  name: string;

  @IsString({ message: 'La descripción del tratamiento debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción del tratamiento no puede estar vacía.' })
  description: string;

  @IsDate({ message: 'La fecha de inicio debe ser una fecha valida.' })
  @IsNotEmpty({ message: 'La fecha de inicio no puede estar vacía.' })
  @Type(() => Date)
  startDate: Date;

  @IsDate({ message: 'La fecha de finalización debe ser una fecha valida.' })
  @IsNotEmpty({ message: 'La fecha de finalización no puede estar vacía.' })
  @Type(() => Date)
  endDate: Date;

  @IsNumber({}, { message: 'El ID de la mascota debe ser un número.' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor a 0.' })
  petId: number;
}
