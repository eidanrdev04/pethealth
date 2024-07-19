import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateVaccinationrecordDto {
  @IsString({ message: 'El tipo de registro debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El tipo de registro no puede estar vacío.' })
  recordType: string;

  @IsNumber({}, { message: 'El ID de la mascota debe ser un número.' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor a 0.' })
  petId: number;
}
