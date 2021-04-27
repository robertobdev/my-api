import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../people/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(userLogin: LoginUserDto) {
    const user = (await this.userService.findOne(userLogin)) as User;
    return {
      access_token: this.jwtService.sign({ sub: user.id, ...user }),
    };
  }
}
