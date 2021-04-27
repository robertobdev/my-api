import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ description: 'Create a person' })
  @ApiBadRequestResponse({
    status: 422,
    description: 'Error to create a person',
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async l() {
    return 'USER';
  }
}
