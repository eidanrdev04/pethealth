import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async createActivity(createActivityDto: CreateActivityDto) {
    const { activityType, description, date, petId } = createActivityDto;
    if (!activityType || !description || !date || !petId) {
      throw new BadRequestException('Todos los campos son obligatorios');
    }
    const parsedDate = new Date(date);
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    return this.prisma.activity.create({
      data: {
        activityType,
        description,
        date: parsedDate,
        petId
      },
    });
  }

  async findAllActivities() {
    return this.prisma.activity.findMany({
      include: { pet: true },
    });
  }

  async findActivityById(id: number) {
    const activity = await this.prisma.activity.findUnique({
      where: { id },
      include: { pet: true },
    });
    if (!activity) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }

    return activity;
  }

  async updateActivity(id: number, updateActivityDto: UpdateActivityDto) {
    const { activityType, description, date, petId } = updateActivityDto;
    const parsedDate = new Date(date);
    if (petId) {
      const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
      if (!pet) {
        throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
      }
    }
    return this.prisma.activity.update({
      where: { id },
      data: {
        activityType,
        description,
        date: parsedDate,
        petId
      },
    });
  }

  async deleteActivity(id: number) {
    return this.prisma.activity.delete({
      where: { id },
    });
  }
}