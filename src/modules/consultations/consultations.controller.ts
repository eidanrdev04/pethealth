import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  async create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationsService.createConsultation(createConsultationDto);
  }

  @Get()
  async findAll() {
    return this.consultationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.consultationsService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateConsultationDto: UpdateConsultationDto) {
    return this.consultationsService.updateConsultation(Number(id), updateConsultationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.consultationsService.deleteConsultation(Number(id));
  }
}
