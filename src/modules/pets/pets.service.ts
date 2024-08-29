import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crea una nueva mascota.
   * @param createPetDto Datos de la mascota a crear.
   * @returns Mensaje de éxito y datos de la mascota creada.
   * @throws {NotFoundException} Si el usuario asociado no se encuentra.
   * @throws {BadRequestException} Si la fecha de nacimiento está en el futuro.
   */
  async createPet(createPetDto: CreatePetDto) {
    const { name, species, breed, birthDate, color, userid } = createPetDto;
    const user = await this.prisma.user.findUnique({ where: { id: userid } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userid} no encontrado`);
    }
    const parsedBirthDate = new Date(birthDate);
    const today = new Date();
    if (parsedBirthDate > today) {
      throw new BadRequestException('La fecha de nacimiento no puede estar en el futuro');
    }
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

  /**
   * Obtiene una mascota por ID.
   * @param id ID de la mascota a obtener.
   * @returns Mensaje de éxito y datos de la mascota encontrada.
   * @throws {NotFoundException} Si la mascota no se encuentra.
   */
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

  /**
   * Obtiene todas las mascotas.
   * @returns Mensaje de éxito y lista de todas las mascotas.
   */
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

  /**
   * Actualiza una mascota por ID.
   * @param id ID de la mascota a actualizar.
   * @param data Datos de la mascota a actualizar.
   * @returns Mensaje de éxito y datos de la mascota actualizada.
   * @throws {NotFoundException} Si la mascota no se encuentra o el usuario asociado no se encuentra.
   * @throws {BadRequestException} Si la fecha de nacimiento está en el futuro.
   */
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
  
    let parsedBirthDate = pet.birthDate;
  
    if (birthDate) {
      parsedBirthDate = new Date(birthDate);
      const today = new Date();
      if (parsedBirthDate > today) {
        throw new BadRequestException('La fecha de nacimiento no puede estar en el futuro');
      }
    }
  
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
  
  /**
   * Elimina una mascota por ID.
   * @param id ID de la mascota a eliminar.
   * @returns Mensaje de éxito y datos de la mascota eliminada.
   * @throws {NotFoundException} Si la mascota no se encuentra.
   */
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
