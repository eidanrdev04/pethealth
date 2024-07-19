import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VaccinationsService {
  constructor(private prisma: PrismaService) {}

  async create(createVaccinationDto: CreateVaccinationDto) {
    const { name, applicationDate, weight, petId, vaccinationRecordId } = createVaccinationDto;
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    const vaccinationRecord = await this.prisma.vaccinationRecord.findUnique({ where: { id: vaccinationRecordId } });
    if (!vaccinationRecord) {
      throw new NotFoundException(`Registro de vacuna con ID ${vaccinationRecordId} no encontrado`);
    }
    const parsedApplicationDate = new Date(applicationDate);
    const currentDate = new Date();
    if (parsedApplicationDate > currentDate || parsedApplicationDate < currentDate) {
      throw new BadRequestException('La fecha de aplicación debe ser la fecha actual');
    }
    const vaccination = await this.prisma.vaccination.create({
      data: {
        name,
        applicationDate: parsedApplicationDate,
        weight,
        petId,
        vaccinationRecordId
      },
    });
    return {
      message: 'Vacuna creada exitosamente',
      vaccination,
    };
  }

  async findOne(id: number) {
    const vaccination = await this.prisma.vaccination.findUnique({
      where: { id },
      include: {
        pet: true,
        vaccinationRecord: true,
      },
    });
    if (!vaccination) {
      throw new NotFoundException(`Vacuna con ID ${id} no encontrada`);
    }
    return {
      message: 'Vacuna encontrada',
      vaccination,
    };
  }

  async findAll() {
    const vaccinations = await this.prisma.vaccination.findMany({
      include: {
        pet: true,
        vaccinationRecord: true,
      },
    });
    return {
      message: 'Vacunas encontradas',
      vaccinations,
    };
  }

  async update(id: number, updateVaccinationDto: UpdateVaccinationDto) {
    const { name, applicationDate, weight, petId, vaccinationRecordId } = updateVaccinationDto;
    const vaccination = await this.prisma.vaccination.findUnique({ where: { id } });
    if (!vaccination) {
      throw new NotFoundException(`Vacuna con ID ${id} no encontrada`);
    }
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    const vaccinationRecord = await this.prisma.vaccinationRecord.findUnique({ where: { id: vaccinationRecordId } });
    if (!vaccinationRecord) {
      throw new NotFoundException(`Registro de vacuna con ID ${vaccinationRecordId} no encontrado`);
    }
    const parsedApplicationDate = new Date(applicationDate);
    const currentDate = new Date();
    if (parsedApplicationDate > currentDate || parsedApplicationDate < currentDate) {
      throw new BadRequestException('La fecha de aplicación debe ser la fecha actual');
    }
    const updatedVaccination = await this.prisma.vaccination.update({
      where: { id },
      data: {
        name,
        applicationDate: parsedApplicationDate,
        weight,
        petId,
        vaccinationRecordId
      },
    });
    return {
      message: 'Vacuna actualizada exitosamente',
      vaccination: updatedVaccination,
    };
  }

  async delete(id: number) {
    const vaccination = await this.prisma.vaccination.findUnique({ where: { id } });
    if (!vaccination) {
      throw new NotFoundException(`Vacuna con ID ${id} no encontrada`);
    }
    await this.prisma.vaccination.delete({ where: { id } });
    return {
      message: 'Vacuna eliminada exitosamente',
      vaccination,
    };
  }
}