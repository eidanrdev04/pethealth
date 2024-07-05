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
    return this.prisma.treatment.create({
      data: {
        name,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        petId
      },
    });
  }

  async findOne(id: number) {
    const treatment = await this.prisma.treatment.findUnique({
      where: { id },
      include: { pet: true },
    });
    if (!treatment) {
      throw new NotFoundException(`Tratamiento con ID ${id} no encontrado`);
    }
    return treatment;
  }

  async findAll() {
    return this.prisma.treatment.findMany({
      include: { pet: true },
    });
  }

  async updateTreatment(id: number, data: UpdateTreatmentDto) {
    const { name, description, startDate, endDate, petId } = data;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    if (petId) {
      const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
      if (!pet) {
        throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
      }
    }
    return this.prisma.treatment.update({
      where: { id },
      data: {
        name,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        petId
      },
    });
  }

  async deleteTreatment(id: number) {
    return this.prisma.treatment.delete({ where: { id } });
  }
}