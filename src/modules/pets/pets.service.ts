import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async createPet(createPetDto: CreatePetDto) {
    const { name, species, breed, birthDate, color, userid } = createPetDto;
    if (!name || !species || !breed || !birthDate || !color || !userid) {
      throw new BadRequestException('Todos los campos son requeridos');
    }
    const user = await this.prisma.user.findUnique({ where: { id: userid } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userid} no encontrado`);
    }
    const parsedBirthDate = new Date(birthDate);
    const pet = await this.prisma.pet.create({
      data: {
        name,
        species,
        breed,
        birthDate: parsedBirthDate,
        color,
        userid,
      },
    });
    return {
      message: 'Mascota creada exitosamente',
      pet,
    };
  }

  async findOne(id: number) {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
      include: {
        vaccinations: true,
        treatments: true,
        activities: true,
        consultations: true,
        vaccinationRecord: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    return {
      message: 'Mascota encontrada',
      pet,
    };
  }

  async findAll() {
    const pets = await this.prisma.pet.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const formattedPets = pets.map(pet => ({
      id: pet.id,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      owner: {
        id: pet.user.id,
        name: pet.user.name,
      },
    }));

    return {
      message: 'Mascotas encontradas',
      pets: formattedPets,
    };
  }

  async updatePet(id: number, data: UpdatePetDto) {
    const { name, species, breed, birthDate, color, userid } = data;
    const pet = await this.prisma.pet.findUnique({ where: { id } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    if (userid) {
      const user = await this.prisma.user.findUnique({ where: { id: userid } });
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${userid} no encontrado`);
      }
    }
    const parsedBirthDate = new Date(birthDate);
    const updatedPet = await this.prisma.pet.update({
      where: { id },
      data: {
        name,
        species,
        breed,
        birthDate: parsedBirthDate,
        color,
        userid
      },
    });
    return {
      message: 'Mascota actualizada exitosamente',
      pet: updatedPet,
    };
  }

  async deletePet(id: number) {
    const pet = await this.prisma.pet.findUnique({ where: { id } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    await this.prisma.pet.delete({ where: { id } });
    return {
      message: 'Mascota eliminada exitosamente',
      pet,
    };
  }
}