import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccinationrecordDto } from './dto/create-vaccinationrecord.dto';
import { UpdateVaccinationrecordDto } from './dto/update-vaccinationrecord.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VaccinationrecordService {
  constructor(private prisma: PrismaService) {}

  async create(createVaccinationRecordDto: CreateVaccinationrecordDto) {
    const { recordType, petId } = createVaccinationRecordDto;
    if (!recordType || !petId) {
      throw new BadRequestException('Todos los campos son requeridos');
    }
    if (recordType !== 'adulto' && recordType !== 'cachorro') {
      throw new BadRequestException('El tipo de registro debe ser adulto o cachorro');
    }
    const existingRecord = await this.prisma.vaccinationRecord.findFirst({
      where: {
        petId,
        recordType,
      },
    });
    if (existingRecord) {
      throw new BadRequestException(`La mascota con ID ${petId} ya tiene una cartilla de ${recordType}`);
    }
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    const vaccinationRecord = await this.prisma.vaccinationRecord.create({
      data: {
        recordType,
        petId
      },
    });
    return {
      message: 'Registro de vacunación creado exitosamente',
      vaccinationRecord,
    };
  }

  async findOne(id: number) {
    const vaccinationRecord = await this.prisma.vaccinationRecord.findUnique({
      where: { id },
      include: {
        pet: true,
        vaccinations: true,
      },
    });
    if (!vaccinationRecord) {
      throw new NotFoundException(`Cartilla de vacunación con ID ${id} no encontrada`);
    }
    return vaccinationRecord;
  }

  async findAll() {
    return this.prisma.vaccinationRecord.findMany();
  }

  async update(id: number, updateVaccinationRecordDto: UpdateVaccinationrecordDto) {
    const { recordType, petId } = updateVaccinationRecordDto;
    if (recordType !== 'adulto' && recordType !== 'cachorro') {
      throw new BadRequestException('El tipo de registro debe ser adulto o cachorro');
    }
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
    const existingRecord = await this.prisma.vaccinationRecord.findFirst({
      where: {
        petId,
        recordType,
        NOT: { id: id },
      },
    });
    if (existingRecord) {
      throw new BadRequestException(`La mascota con ID ${petId} ya tiene una cartilla de ${recordType}`);
    }
    return this.prisma.vaccinationRecord.update({
      where: { id },
      data: {
        recordType,
        petId,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.vaccinationRecord.delete({ where: { id } });
  }
}