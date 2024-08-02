import { IsOptional, IsIn, IsInt, IsString, IsDate, Validate, MinDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la mascota es obligatorio si se proporciona' })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'La especie de la mascota es obligatoria si se proporciona' })
  @IsIn(['Perro', 'Gato'], { message: 'La especie debe ser Perro o Gato' })
  species?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'La raza de la mascota es obligatoria si se proporciona' })
  breed?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  birthDate?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'El color de la mascota es obligatorio si se proporciona' })
  color?: string;

  @IsOptional()
  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  userid?: number;
}
