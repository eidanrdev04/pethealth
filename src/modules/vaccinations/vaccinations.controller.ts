import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { VaccinationsService } from './vaccinations.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('vaccinations')
export class VaccinationsController {
  constructor(private readonly vaccinationsService: VaccinationsService) {}

  @Post()
  async create(@Body() createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationsService.create(createVaccinationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.vaccinationsService.findOne(Number(id));
  }

  @Get()
  async findAll() {
    return this.vaccinationsService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationsService.update(Number(id), updateVaccinationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.vaccinationsService.delete(Number(id));
  }
}