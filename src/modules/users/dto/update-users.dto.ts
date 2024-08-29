import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario (opcional)',
    example: 'Carlos Gómez',
    required: false,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario (opcional)',
    example: 'carlos.gomez@example.com',
    required: false,
  })
  @IsEmail({}, { message: 'El correo electrónico debe ser una dirección de correo válida.' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Contraseña del usuario, debe tener al menos 8 caracteres (opcional)',
    example: 'newSecurePassword456',
    minLength: 8,
    required: false,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @IsOptional()
  password?: string;
}
