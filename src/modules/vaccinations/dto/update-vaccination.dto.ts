import { IsString, IsOptional, IsDate, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

export class UpdateVaccinationDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsOptional()
  name?: string;

  @IsDate({ message: 'La fecha de aplicación debe ser una fecha valida' })
  @IsOptional()
  @Type(() => Date)
  applicationDate?: Date;

  @IsOptional()
  weight?: Decimal;

  @IsNumber({}, { message: 'El ID de la mascota debe ser un número.' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor a 0.' })
  @IsOptional()
  petId?: number;

  @IsNumber({}, { message: 'El ID del registro de vacunación debe ser un número.' })
  @Min(1, { message: 'El ID del registro de vacunación debe ser mayor a 0.' })
  @IsOptional()
  vaccinationRecordId?: number;
}
