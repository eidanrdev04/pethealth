import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { VaccinationsService } from './vaccinations.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('vaccinations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('vaccinations')
export class VaccinationsController {
  constructor(private readonly vaccinationsService: VaccinationsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva vacunación' })
  @ApiResponse({ status: 201, description: 'Vacunación creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiBody({ type: CreateVaccinationDto })
  async create(@Body() createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationsService.create(createVaccinationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una vacunación por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la vacunación' })
  @ApiResponse({ status: 200, description: 'Vacunación encontrada.' })
  @ApiResponse({ status: 404, description: 'Vacunación no encontrada.' })
  async findOne(@Param('id') id: number) {
    return this.vaccinationsService.findOne(Number(id));
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las vacunaciones' })
  @ApiResponse({ status: 200, description: 'Lista de vacunaciones.' })
  async findAll() {
    return this.vaccinationsService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una vacunación por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la vacunación' })
  @ApiBody({ type: UpdateVaccinationDto })
  @ApiResponse({ status: 200, description: 'Vacunación actualizada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'Vacunación no encontrada.' })
  async update(@Param('id') id: number, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationsService.update(Number(id), updateVaccinationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una vacunación por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la vacunación' })
  @ApiResponse({ status: 200, description: 'Vacunación eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Vacunación no encontrada.' })
  async delete(@Param('id') id: number) {
    return this.vaccinationsService.delete(Number(id));
  }
}
