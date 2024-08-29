import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El correo electrónico es inválido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}