import {
  Body,
  Controller,
  Get,
  HttpCode,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { RequestPasswordDto } from '../users/dto/request-password.dto';
import { HttpResponse } from 'src/utils/http-response';
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

  @Get('user')
  @ApiCreatedResponse({ description: 'Get an user' })
  @UseGuards(JwtAuthGuard)
  @ApiBadRequestResponse({
    status: 404,
    description: 'User not found!',
  })
  async getUserAuthorization(@Request() { user }) {
    delete user.acl;
    delete user.iat;
    delete user.exp;
    return user;
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
