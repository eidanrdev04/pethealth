import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccinationrecordDto } from './dto/create-vaccinationrecord.dto';
import { UpdateVaccinationrecordDto } from './dto/update-vaccinationrecord.dto';
import { PrismaService } from '../prisma/prisma.service';

function calculateAgeInMonths(birthDate: Date): number {
  const today = new Date();
  const birth = new Date(birthDate);

  let ageInMonths = (today.getMonth() - birth.getMonth()) + (12 * (today.getFullYear() - birth.getFullYear()));

  if (today.getDate() < birth.getDate()) {
      ageInMonths--;
  }

  return ageInMonths;
}

@Injectable()
export class VaccinationrecordService {
constructor(private prisma: PrismaService) {}

async create(createVaccinationRecordDto: CreateVaccinationrecordDto) {
  const { recordType, petId } = createVaccinationRecordDto;
  const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
  if (!pet) {
    throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
  }
  if (pet.species == 'Perro') {
    if (recordType !== 'adulto' && recordType !== 'cachorro') {
      throw new BadRequestException('El tipo de registro debe ser adulto o cachorro');
    }
    const ageInMonths = calculateAgeInMonths(pet.birthDate);
  if (recordType === 'cachorro' && ageInMonths < 12) {
    throw new BadRequestException('Solo se pueden registrar cachorros menores de 12 meses');
  }
  if (recordType === 'adulto' && ageInMonths >= 12) {
    throw new BadRequestException('Solo se pueden registrar adultos mayores o iguales a 12 meses');
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
  }
  if (pet.species == 'Gato') {
    if (recordType !== 'adulto' && recordType !== 'gatito') {
      throw new BadRequestException('El tipo de registro debe ser adulto o gatito');
    }
    const ageInMonths = calculateAgeInMonths(pet.birthDate);
    if (recordType === 'gatito' && ageInMonths >= 12) {
      throw new BadRequestException('Solo se pueden registrar gatitos menores de 12 meses');
    }
    if (recordType === 'adulto' && ageInMonths < 12) {
      throw new BadRequestException('Solo se pueden registrar adultos mayores o iguales a 12 meses');
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
  const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
  if (!pet) {
    throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
  }
  if (pet.species == 'Perro') {
    if (recordType !== 'adulto' && recordType !== 'cachorro') {
      throw new BadRequestException('El tipo de registro debe ser adulto o cachorro');
    }
    const ageInMonths = calculateAgeInMonths(pet.birthDate);
  if (recordType === 'cachorro' && ageInMonths >= 12) {
    throw new BadRequestException('Solo se pueden registrar cachorros menores de 12 meses');
  }
  if (recordType === 'adulto' && ageInMonths < 12) {
    throw new BadRequestException('Solo se pueden registrar adultos mayores o iguales a 12 meses');
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
  }
  if (pet.species == 'Gato') {
    if (recordType !== 'adulto' && recordType !== 'gatito') {
      throw new BadRequestException('El tipo de registro debe ser adulto o gatito');
    }
    const ageInMonths = calculateAgeInMonths(pet.birthDate);
    if (recordType === 'gatito' && ageInMonths >= 12) {
      throw new BadRequestException('Solo se pueden registrar gatitos menores de 12 meses');
    }
    if (recordType === 'adulto' && ageInMonths < 12) {
      throw new BadRequestException('Solo se pueden registrar adultos mayores o iguales a 12 meses');
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
  const vaccionationrecord = await this.prisma.vaccinationRecord.findUnique({ where: { id } });
  if (!vaccionationrecord) {
    throw new NotFoundException(`Vaccination Record con ID ${id} no encontrada`);
  }
  await this.prisma.vaccinationRecord.delete({ where: { id } });
  return {
    message: 'Vaccination Record eliminada exitosamente',
    vaccionationrecord,
  };
}
}