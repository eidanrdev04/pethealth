import { IsNotEmpty, IsIn, IsInt, IsString, IsDate, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la mascota es obligatorio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La especie de la mascota es obligatoria' })
  @IsIn(['Perro', 'Gato'], { message: 'La especie debe ser Perro o Gato' })
  species: string;

  @IsString()
  @IsNotEmpty({ message: 'La raza de la mascota es obligatoria' })
  breed: string;

  @Type(() => Date)
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  @MinDate(new Date('2005-01-01'), { message: 'La fecha de nacimiento debe ser posterior al 1 de enero de 2005' })
  birthDate: Date;

  @IsString()
  @IsNotEmpty({ message: 'El color de la mascota es obligatorio' })
  color: string;

  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  userid: number;
}

