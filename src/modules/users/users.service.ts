import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-users.dto';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { name: string; email: string; password: string }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.name || !data.email || !data.password) {
      throw new BadRequestException('Todos los campos son requeridos');
    }
    if (!emailRegex.test(data.email)) {
      throw new ConflictException('Correo inválido');
    }
    if (data.password.length < 8) {
      throw new ConflictException('Contraseña debe ser de al menos 8 caracteres');
    }
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Correo ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return {
      message: 'Usuario creado exitosamente',
      user,
    };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { pets: true },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return {
      message: 'Usuario encontrado',
      user,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({ include: { pets: true } });
    return {
      message: 'Usuarios encontrados',
      users,
    };
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const { password, email, ...rest } = data;

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new ConflictException('Correo inválido');
      }
      const existingUser = await this.findByEmail(email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Correo ya existe');
      }
    }

    let updatedUser;
    if (password) {
      if (password.length < 8) {
        throw new ConflictException('Contraseña debe ser de al menos 8 caracteres');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...rest,
          email,
          password: hashedPassword,
        },
      });
    } else {
      updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...rest,
          email,
        },
      });
    }

    return {
      message: 'Usuario actualizado exitosamente',
      user: updatedUser,
    };
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    await this.prisma.user.delete({ where: { id } });
    return {
      message: 'Usuario eliminado exitosamente',
      user,
    };
  }
}
