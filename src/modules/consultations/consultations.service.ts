import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  async createConsultation(createConsultationDto: CreateConsultationDto) {
    const { veterinarian, description, date, petId } = createConsultationDto;
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    const parsedDate = new Date(date);

    const consultation = await this.prisma.consultation.create({
      data: {
        veterinarian,
        description,
        date: parsedDate,
        petId
      },
    });

    return {
      message: 'Consulta creada exitosamente',
      consultation,
    };
  }

  async findOne(id: number) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
      include: { pet: true },
    });
    if (!consultation) {
      throw new NotFoundException(`Consulta con ID ${id} no encontrada`);
    }
    return {
      message: 'Consulta encontrada',
      consultation,
    };
  }

  async findAll() {
    const consultations = await this.prisma.consultation.findMany({
      include: { pet: true },
    });
    return {
      message: 'Consultas encontradas',
      consultations,
    };
  }

  async updateConsultation(id: number, data: UpdateConsultationDto) {
    const { petId, ...rest } = data;
    if (petId) {
      const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
      if (!pet) {
        throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
      }
    }
    const updatedConsultation = await this.prisma.consultation.update({
      where: { id },
      data: {
        ...rest,
        petId,
      },
    });

    return {
      message: 'Consulta actualizada exitosamente',
      consultation: updatedConsultation,
    };
  }

  async deleteConsultation(id: number) {
    const consultation = await this.prisma.consultation.findUnique({ where: { id } });
    if (!consultation) {
      throw new NotFoundException(`Consulta con ID ${id} no encontrada`);
    }
    await this.prisma.consultation.delete({ where: { id } });

    return {
      message: 'Consulta eliminada exitosamente',
      consultation,
    };
  }
}
