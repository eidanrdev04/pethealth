import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  async createConsultation(createConsultationDto: CreateConsultationDto) {
    const { veterinarian, description, date, petId } = createConsultationDto;
    if (!veterinarian || !description || !date || !petId) {
      throw new BadRequestException('Todos los campos son requeridos para crear una consulta.');
    }
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    const parsedDate = new Date(date);

    return this.prisma.consultation.create({
      data: {
        veterinarian,
        description,
        date: parsedDate,
        petId
      },
    });
  }

  async findOne(id: number) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
      include: { pet: true },
    });
    if (!consultation) {
      throw new NotFoundException(`Consulta con ID ${id} no encontrada`);
    }
    return consultation;
  }

  async findAll() {
    return this.prisma.consultation.findMany({
      include: { pet: true },
    });
  }

  async updateConsultation(id: number, data: UpdateConsultationDto) {
    const { petId, ...rest } = data;
    if (petId) {
      const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
      if (!pet) {
        throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
      }
    }
    return this.prisma.consultation.update({
      where: { id },
      data: {
        ...rest,
        petId,
      },
    });
  }

  async deleteConsultation(id: number) {
    return this.prisma.consultation.delete({ where: { id } });
  }
}
