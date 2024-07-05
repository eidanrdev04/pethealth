import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedData() {
    return { message: 'Esta ruta es la que esta protegida' };
  }

  @Get('public')
  getPublicData() {
    return { message: 'Esta ruta es publica' };
  }
}