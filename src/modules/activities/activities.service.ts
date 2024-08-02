import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async createActivity(createActivityDto: CreateActivityDto) {
    const { activityType, description, date, petId } = createActivityDto;
    const parsedDate = new Date(date);
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    const activity = await this.prisma.activity.create({
      data: {
        activityType,
        description,
        date: parsedDate,
        petId
      },
    });
    return {
      message: 'Actividad creada exitosamente',
      activity,
    };
  }

  async findAllActivities() {
    const activities = await this.prisma.activity.findMany({
      include: { pet: true },
    });
    return {
      message: 'Actividades encontradas',
      activities,
    };
  }

  async findActivityById(id: number) {
    const activity = await this.prisma.activity.findUnique({
      where: { id },
      include: { pet: true },
    });
    if (!activity) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }
    return {
      message: 'Actividad encontrada',
      activity,
    };
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
    const updatedActivity = await this.prisma.activity.update({
      where: { id },
      data: {
        activityType,
        description,
        date: parsedDate,
        petId
      },
    });
    return {
      message: 'Actividad actualizada exitosamente',
      activity: updatedActivity,
    };
  }

  async deleteActivity(id: number) {
    const activity = await this.prisma.activity.findUnique({ where: { id } });
    if (!activity) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }
    await this.prisma.activity.delete({ where: { id } });
    return {
      message: 'Actividad eliminada exitosamente',
      activity,
    };
  }
}