import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { compareSync } from 'bcrypt';
import { HttpResponse } from 'src/utils/http-response';
import { User as IUser } from '../users/interfaces/user.interface';
import { Role } from './entities/role.entity';
import { Acl } from '../acl/entities/acl.entity';
import { Modules } from '../acl/entities/module.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async findOne(userLogin: LoginUserDto) {
    const { login, password } = userLogin;
    const user = await this.userModel.findOne({
      where: { login },
      include: [
        {
          model: Role,
          attributes: ['id', 'description'],
          include: [
            {
              model: Acl,
              include: [Modules],
              attributes: ['isShow', 'isGet', 'isPost', 'isUpdate', 'isDelete'],
            },
          ],
        },
      ],
    });
    if (!user || !compareSync(password, user.password)) {
      throw HttpResponse.badRequest('Dados incorretos!');
    }
    const userDecode = user.toJSON() as IUser;
    //TODO: Fix exclude field on User Entity
    delete userDecode.password;
    userDecode.roles.map((role: any) => {
      role.acl = role.acl
        .reduce((acc, current) => {
          const keys = Object.keys(current);
          //TODO: Remove last key
          const arrays = keys
            .join(`_${current.module.description},`)
            .split(',');
          arrays.pop();
          acc = [...arrays, ...acc];
          return acc;
        }, [])
        .map((acl: string) => acl.toUpperCase().replace('IS', ''));

      delete role.RoleUser;
      return role;
    });
    return userDecode;
  }
}
