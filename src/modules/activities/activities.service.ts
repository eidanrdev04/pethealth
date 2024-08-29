import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Activities') 
@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  @ApiOperation({ summary: 'Crear una nueva actividad' })
  @ApiResponse({ status: 201, description: 'Actividad creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
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

  @ApiOperation({ summary: 'Obtener todas las actividades' })
  @ApiResponse({ status: 200, description: 'Actividades encontradas.' })
  async findAllActivities() {
    const activities = await this.prisma.activity.findMany({
      include: { pet: true },
    });
    return {
      message: 'Actividades encontradas',
      activities,
    };
  }

  @ApiOperation({ summary: 'Obtener una actividad por ID' })
  @ApiResponse({ status: 200, description: 'Actividad encontrada.' })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada.' })
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

  @ApiOperation({ summary: 'Actualizar una actividad existente' })
  @ApiResponse({ status: 200, description: 'Actividad actualizada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada.' })
  async updateActivity(id: number, updateActivityDto: UpdateActivityDto) {
  const { activityType, description, date, petId } = updateActivityDto;

  const updateData: any = {};
  
  if (activityType !== undefined) updateData.activityType = activityType;
  if (description !== undefined) updateData.description = description;
  if (date !== undefined) updateData.date = new Date(date);
  if (petId !== undefined) {
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    updateData.petId = petId;
  }

  try {
    const updatedActivity = await this.prisma.activity.update({
      where: { id },
      data: updateData,
    });
    return {
      message: 'Actividad actualizada exitosamente',
      activity: updatedActivity,
    };
  } catch (error) {
    throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
  }
}


  @ApiOperation({ summary: 'Eliminar una actividad por ID' })
  @ApiResponse({ status: 200, description: 'Actividad eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada.' })
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
