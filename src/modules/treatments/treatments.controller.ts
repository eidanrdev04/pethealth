import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('treatments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('treatments')
export class TreatmentsController {
  constructor(private treatmentsService: TreatmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new treatment' })
  @ApiResponse({ status: 201, description: 'The treatment has been successfully created.', type: CreateTreatmentDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createTreatment(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.createTreatment(createTreatmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all treatments' })
  @ApiResponse({ status: 200, description: 'List of all treatments', type: [CreateTreatmentDto] })
  @ApiResponse({ status: 404, description: 'No treatments found' })
  async getAllTreatments() {
    return this.treatmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get treatment by ID' })
  @ApiResponse({ status: 200, description: 'The treatment has been successfully found', type: CreateTreatmentDto })
  @ApiResponse({ status: 404, description: 'Treatment not found' })
  async getTreatmentById(@Param('id') id: number) {
    return this.treatmentsService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing treatment' })
  @ApiResponse({ status: 200, description: 'The treatment has been successfully updated', type: UpdateTreatmentDto })
  @ApiResponse({ status: 404, description: 'Treatment not found' })
  async updateTreatment(@Param('id') id: number, @Body() updateTreatmentDto: UpdateTreatmentDto) {
    return this.treatmentsService.updateTreatment(Number(id), updateTreatmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a treatment by ID' })
  @ApiResponse({ status: 200, description: 'The treatment has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Treatment not found' })
  async deleteTreatment(@Param('id') id: number) {
    return this.treatmentsService.deleteTreatment(Number(id));
  }
}
