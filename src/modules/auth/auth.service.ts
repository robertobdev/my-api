import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RequestPasswordDto } from '../users/dto/request-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(userLogin: LoginUserDto) {
    const user = await this.userService.findByLogin(userLogin);
    return {
      access_token: this.jwtService.sign({ id: user.id }),
    };
  }

  async requestPassword(requestPassword: RequestPasswordDto) {
    const user = await this.userService.requestPassword(requestPassword);
    if (!user) {
      return true;
    }

    //TODO: Send email
    return true;
  }
}
