import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new treatment' })
  @ApiResponse({ status: 201, description: 'Treatment created successfully.' })
  @ApiResponse({ status: 404, description: 'Pet not found.' })
  async createTreatment(createTreatmentDto: CreateTreatmentDto) {
    const { name, description, startDate, endDate, petId } = createTreatmentDto;
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

  @ApiOperation({ summary: 'Get a treatment by ID' })
  @ApiResponse({ status: 200, description: 'Treatment found successfully.' })
  @ApiResponse({ status: 404, description: 'Treatment not found.' })
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

  @ApiOperation({ summary: 'Get all treatments' })
  @ApiResponse({ status: 200, description: 'Treatments found successfully.' })
  async findAll() {
    const treatments = await this.prisma.treatment.findMany({
      include: { pet: true },
    });
    return {
      message: 'Tratamientos encontrados',
      treatments,
    };
  }

  @ApiOperation({ summary: 'Update a treatment by ID' })
@ApiResponse({ status: 200, description: 'Treatment updated successfully.' })
@ApiResponse({ status: 404, description: 'Pet not found or Treatment not found.' })
async updateTreatment(id: number, data: UpdateTreatmentDto) {
  const { name, description, startDate, endDate, petId } = data;

  if (petId) {
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }
  }

  const updateData: any = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (startDate !== undefined) updateData.startDate = new Date(startDate);
  if (endDate !== undefined) updateData.endDate = new Date(endDate);
  if (petId !== undefined) updateData.petId = petId;

  const updatedTreatment = await this.prisma.treatment.update({
    where: { id },
    data: updateData,
  });

  return {
    message: 'Tratamiento actualizado exitosamente',
    treatment: updatedTreatment,
  };
}


  @ApiOperation({ summary: 'Delete a treatment by ID' })
  @ApiResponse({ status: 200, description: 'Treatment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Treatment not found.' })
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
