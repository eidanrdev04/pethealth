import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';

@ApiTags('pets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva mascota' })  
  @ApiResponse({ status: 201, description: 'Mascota creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  async createPet(@Body() createPetDto: CreatePetDto) {
    return this.petsService.createPet(createPetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las mascotas' })
  @ApiResponse({ status: 200, description: 'Lista de mascotas.' })
  async getAllPets() {
    return this.petsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una mascota por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la mascota' })  
  @ApiResponse({ status: 200, description: 'Mascota encontrada.' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  async getPetById(@Param('id') id: number) {
    return this.petsService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una mascota por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la mascota' })
  @ApiResponse({ status: 200, description: 'Mascota actualizada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  async updatePet(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.updatePet(Number(id), updatePetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una mascota por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la mascota' })
  @ApiResponse({ status: 200, description: 'Mascota eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  async deletePet(@Param('id') id: number) {
    return this.petsService.deletePet(Number(id));
  }
}
