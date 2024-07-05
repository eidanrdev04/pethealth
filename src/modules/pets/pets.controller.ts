import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Post()
  async createPet(@Body() createPetDto: CreatePetDto) {
    return this.petsService.createPet(createPetDto);
  }

  @Get()
  async getAllPets() {
    return this.petsService.findAll();
  }

  @Get(':id')
  async getPetById(@Param('id') id: string) {
    return this.petsService.findOne(Number(id));
  }

  @Put(':id')
  async updatePet(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.updatePet(Number(id), updatePetDto);
  }

  @Delete(':id')
  async deletePet(@Param('id') id: string) {
    return this.petsService.deletePet(Number(id));
  }
}