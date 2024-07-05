import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { VaccinationrecordService } from './vaccinationrecords.service';
import { CreateVaccinationrecordDto } from './dto/create-vaccinationrecord.dto';
import { UpdateVaccinationrecordDto } from './dto/update-vaccinationrecord.dto';

@Controller('vaccination-records')
export class VaccinationrecordController {
  constructor(private readonly vaccinationRecordService: VaccinationrecordService) {}

  @Post()
  async create(@Body() creardto: CreateVaccinationrecordDto) {
    return this.vaccinationRecordService.create(creardto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.vaccinationRecordService.findOne(Number(id));
  }

  @Get()
  async findAll() {
    return this.vaccinationRecordService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatedto: UpdateVaccinationrecordDto) {
    return this.vaccinationRecordService.update(Number(id), updatedto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.vaccinationRecordService.delete(Number(id));
  }
}