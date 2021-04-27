import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { compareSync } from 'bcrypt';
import { HttpResponse } from 'src/utils/http-response';
import { User as IUser } from '../users/interfaces/user.interface';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async findOne(userLogin: LoginUserDto) {
    const { login, password } = userLogin;
    const user = await this.userModel.findOne({
      where: { login },
      include: [Role],
    });
    if (!user || !compareSync(password, user.password)) {
      throw HttpResponse.badRequest('Dados incorretos!');
    }
    const userDecode = user.toJSON() as IUser;
    //TODO: Fix exclude field on User Entity
    delete userDecode.password;
    // console.log('USER-DATA', user);
    return userDecode;
  }
}
