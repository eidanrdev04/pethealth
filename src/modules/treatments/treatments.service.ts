import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  async createTreatment(createTreatmentDto: CreateTreatmentDto) {
    const { name, description, startDate, endDate, petId } = createTreatmentDto;
    if (!name || !description || !startDate || !endDate || !petId) {
      throw new BadRequestException('Todos los campos son requeridos para crear un tratamiento');
    }
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    const treatment = await this.prisma.treatment.create({
      data: {
        name,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        petId
      },
    });
    return {
      message: 'Tratamiento creado exitosamente',
      treatment,
    };
  }

  async findOne(id: number) {
    const treatment = await this.prisma.treatment.findUnique({
      where: { id },
      include: { pet: true },
    });
    if (!treatment) {
      throw new NotFoundException(`Tratamiento con ID ${id} no encontrado`);
    }
    return {
      message: 'Tratamiento encontrado',
      treatment,
    };
  }

  async findAll() {
    const treatments = await this.prisma.treatment.findMany({
      include: { pet: true },
    });
    return {
      message: 'Tratamientos encontrados',
      treatments,
    };
  }

  async updateTreatment(id: number, data: UpdateTreatmentDto) {
    const { name, description, startDate, endDate, petId } = data;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    if (!name || !description || !startDate || !endDate || !petId) {
      throw new BadRequestException('Todos los campos son requeridos para actualizar un tratamiento');
    }
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    const updatedTreatment = await this.prisma.treatment.update({
      where: { id },
      data: {
        name,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        petId
      },
    });
    return {
      message: 'Tratamiento actualizado exitosamente',
      treatment: updatedTreatment,
    };
  }

  async deleteTreatment(id: number) {
    const treatment = await this.prisma.treatment.findUnique({ where: { id } });
    if (!treatment) {
      throw new NotFoundException(`Tratamiento con ID ${id} no encontrado`);
    }
    await this.prisma.treatment.delete({ where: { id } });
    return {
      message: 'Tratamiento eliminado exitosamente',
      treatment,
    };
  }
}