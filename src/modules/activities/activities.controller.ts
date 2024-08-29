import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new activity' })
  @ApiBody({ type: CreateActivityDto })
  @ApiResponse({ status: 201, description: 'The activity has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createActivity(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.createActivity(createActivityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activities' })
  @ApiResponse({ status: 200, description: 'List of all activities.' })
  async getAllActivities() {
    return this.activitiesService.findAllActivities();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an activity by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the activity to retrieve' })
  @ApiResponse({ status: 200, description: 'The activity has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Activity not found.' })
  async getActivityById(@Param('id') id: number) {
    return this.activitiesService.findActivityById(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an activity by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the activity to update' })
  @ApiBody({ type: UpdateActivityDto })
  @ApiResponse({ status: 200, description: 'The activity has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Activity or pet not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async updateActivity(@Param('id') id: number, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activitiesService.updateActivity(Number(id), updateActivityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an activity by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the activity to delete' })
  @ApiResponse({ status: 200, description: 'The activity has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Activity not found.' })
  async deleteActivity(@Param('id') id: number) {
    return this.activitiesService.deleteActivity(Number(id));
  }
}
