import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users')  
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })  
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  async register(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.createUser(createUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getUser(@Param('id') id: number) {
    return this.usersService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async updateUser(@Param('id') id: number, @Body() updateUsersDto: UpdateUserDto) {
    return this.usersService.updateUser(Number(id), updateUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(Number(id));
  }
}
