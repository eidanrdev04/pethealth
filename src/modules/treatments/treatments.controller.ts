import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { JwtAuthGuard } from 'src/guards/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('treatments')
export class TreatmentsController {
  constructor(private treatmentsService: TreatmentsService) {}

  @Post()
  async createTreatment(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.createTreatment(createTreatmentDto);
  }

  @Get()
  async getAllTreatments() {
    return this.treatmentsService.findAll();
  }

  @Get(':id')
  async getTreatmentById(@Param('id') id: number) {
    return this.treatmentsService.findOne(Number(id));
  }

  @Put(':id')
  async updateTreatment(@Param('id') id: number, @Body() updateTreatmentDto: UpdateTreatmentDto) {
    return this.treatmentsService.updateTreatment(Number(id), updateTreatmentDto);
  }

  @Delete(':id')
  async deleteTreatment(@Param('id') id: number) {
    return this.treatmentsService.deleteTreatment(Number(id));
  }
}