import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crea una nueva consulta.
   * @param createConsultationDto Datos de la consulta a crear.
   * @returns Mensaje de éxito y datos de la consulta creada.
   */
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
        petId,
      },
    });

    return {
      message: 'Consulta creada exitosamente',
      consultation,
    };
  }

  /**
   * Obtiene una consulta por su ID.
   * @param id ID de la consulta a obtener.
   * @returns Mensaje de éxito y datos de la consulta encontrada.
   */
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

  /**
   * Obtiene todas las consultas.
   * @returns Mensaje de éxito y lista de todas las consultas encontradas.
   */
  async findAll() {
    const consultations = await this.prisma.consultation.findMany({
      include: { pet: true },
    });
    return {
      message: 'Consultas encontradas',
      consultations,
    };
  }

  /**
   * Actualiza una consulta existente.
   * @param id ID de la consulta a actualizar.
   * @param data Datos de la consulta a actualizar.
   * @returns Mensaje de éxito y datos de la consulta actualizada.
   */
  async updateConsultation(id: number, data: UpdateConsultationDto) {
    const { petId, date, ...rest } = data;

    if (petId) {
      const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
      if (!pet) {
        throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
      }
    }

    const updateData: any = { ...rest, petId };
    if (date) {
      updateData.date = new Date(date);
    }

    const updatedConsultation = await this.prisma.consultation.update({
      where: { id },
      data: updateData,
    });

    return {
      message: 'Consulta actualizada exitosamente',
      consultation: updatedConsultation,
    };
  }

  /**
   * Elimina una consulta por su ID.
   * @param id ID de la consulta a eliminar.
   * @returns Mensaje de éxito y datos de la consulta eliminada.
   */
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
