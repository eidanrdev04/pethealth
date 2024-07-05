import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.createUser(createUsersDto);
  }
  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findOne(Number(id));
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUsersDto: UpdateUserDto) {
    return this.usersService.updateUser(Number(id), updateUsersDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(Number(id));
  }
}