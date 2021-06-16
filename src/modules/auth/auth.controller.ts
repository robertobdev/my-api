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
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RequestPasswordDto } from '../users/dto/request-password.dto';
import { HttpResponse } from '../../utils/http-response';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: LoginUserDto })
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserAuthorization(@Request() { user }) {
    delete user.acl;
    delete user.iat;
    delete user.exp;
    return user;
  }

  //TODO: Make test
  @Post('request-password')
  @ApiBody({ type: LoginUserDto })
  @HttpCode(200)
  async requestNewPassword(@Body() requestPasswordDto: RequestPasswordDto) {
    await this.authService.requestPassword(requestPasswordDto);
    return HttpResponse.ok(
      'Se o email estiver correto, a messagem será enviada!',
    );
  }
}
