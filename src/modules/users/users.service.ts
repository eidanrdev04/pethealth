import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-users.dto';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(id: number){
    return this.prisma.user.findUnique({ where: { id } });
  }
  async findAll(){
    return this.prisma.user.findMany();
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const { password, ...rest } = data;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return this.prisma.user.update({
        where: { id },
        data: {
          ...rest,
          password: hashedPassword, 
        },
      });
    } else {
      return this.prisma.user.update({
        where: { id },
        data: rest,
      });
    }
  }

  async deleteUser(id: number){
    return this.prisma.user.delete({ where: { id } });
  }
}