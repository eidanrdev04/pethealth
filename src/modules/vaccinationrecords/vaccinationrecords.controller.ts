import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { VaccinationrecordService } from './vaccinationrecords.service';
import { CreateVaccinationrecordDto } from './dto/create-vaccinationrecord.dto';
import { UpdateVaccinationrecordDto } from './dto/update-vaccinationrecord.dto';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('vaccination-records')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('vaccination-records')
export class VaccinationrecordController {
  constructor(private readonly vaccinationRecordService: VaccinationrecordService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Registro de vacunación creado exitosamente.',
    type: CreateVaccinationrecordDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la solicitud, los datos enviados son inválidos.',
  })
  async create(@Body() creardto: CreateVaccinationrecordDto) {
    return this.vaccinationRecordService.create(creardto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Registro de vacunación encontrado exitosamente.',
    type: CreateVaccinationrecordDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Registro de vacunación no encontrado.',
  })
  async findOne(@Param('id') id: number) {
    return this.vaccinationRecordService.findOne(Number(id));
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Registros de vacunación encontrados exitosamente.',
    type: [CreateVaccinationrecordDto],
  })
  async findAll() {
    return this.vaccinationRecordService.findAll();
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Registro de vacunación actualizado exitosamente.',
    type: UpdateVaccinationrecordDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la solicitud, los datos enviados son inválidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Registro de vacunación no encontrado.',
  })
  async update(@Param('id') id: number, @Body() updatedto: UpdateVaccinationrecordDto) {
    return this.vaccinationRecordService.update(Number(id), updatedto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Registro de vacunación eliminado exitosamente.',
    type: CreateVaccinationrecordDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Registro de vacunación no encontrado.',
  })
  async delete(@Param('id') id: number) {
    return this.vaccinationRecordService.delete(Number(id));
  }
}
