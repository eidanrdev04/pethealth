import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateVaccinationrecordDto {
  @IsString({ message: 'El tipo de registro debe ser una cadena de texto.' })
  @IsOptional()
  recordType?: string;

  @IsNumber({}, { message: 'El ID de la mascota debe ser un número.' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor a 0.' })
  @IsOptional()
  petId?: number;
}
