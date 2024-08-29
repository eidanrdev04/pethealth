import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Consultations') 
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva consulta' })
  @ApiResponse({ status: 201, description: 'Consulta creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  async create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationsService.createConsultation(createConsultationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las consultas' })
  @ApiResponse({ status: 200, description: 'Consultas encontradas.' })
  async findAll() {
    return this.consultationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una consulta por ID' })
  @ApiResponse({ status: 200, description: 'Consulta encontrada.' })
  @ApiResponse({ status: 404, description: 'Consulta no encontrada.' })
  async findOne(@Param('id') id: number) {
    return this.consultationsService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una consulta existente' })
  @ApiResponse({ status: 200, description: 'Consulta actualizada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'Consulta no encontrada.' })
  async update(@Param('id') id: number, @Body() updateConsultationDto: UpdateConsultationDto) {
    return this.consultationsService.updateConsultation(Number(id), updateConsultationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una consulta por ID' })
  @ApiResponse({ status: 200, description: 'Consulta eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Consulta no encontrada.' })
  async remove(@Param('id') id: number) {
    return this.consultationsService.deleteConsultation(Number(id));
  }
}
