import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { RequestPasswordDto } from '../users/dto/request-password.dto';
import { HttpResponse } from 'src/utils/http-response';

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

  @Post('request-password')
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ description: 'Create a person' })
  @ApiBadRequestResponse({
    status: 422,
    description: 'Error to create a person',
  })
  @HttpCode(200)
  async requestNewPassword(@Body() requestPasswordDto: RequestPasswordDto) {
    await this.authService.requestPassword(requestPasswordDto);
    return HttpResponse.ok(
      'Se o email estiver correto, a messagem será enviada!',
    );
  }
}
