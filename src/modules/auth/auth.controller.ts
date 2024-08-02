import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../guards/auth/local-auth.guard';
import { CreateUsersDto } from '../users/dto/create-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() createUsersDto: CreateUsersDto) {
    return this.authService.login(createUsersDto);
  }
}