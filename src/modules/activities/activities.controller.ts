import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { JwtAuthGuard } from 'src/guards/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  async createActivity(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.createActivity(createActivityDto);
  }

  @Get()
  async getAllActivities() {
    return this.activitiesService.findAllActivities();
  }

  @Get(':id')
  async getActivityById(@Param('id') id: number) {
    return this.activitiesService.findActivityById(Number(id));
  }

  @Put(':id')
  async updateActivity(@Param('id') id: number, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activitiesService.updateActivity(Number(id), updateActivityDto);
  }

  @Delete(':id')
  async deleteActivity(@Param('id') id: number) {
    return this.activitiesService.deleteActivity(Number(id));
  }
}