import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, BadRequestException, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { JwtAuthGuard } from 'src/guards/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
  async getPetById(@Param('id') id: number) {
    return this.petsService.findOne(Number(id));
  }

  @Put(':id')
  async updatePet(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.updatePet(Number(id), updatePetDto);
  }

  @Delete(':id')
  async deletePet(@Param('id') id: number) {
    return this.petsService.deletePet(Number(id));
  }
}