import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { compareSync } from 'bcrypt';
import { HttpResponse } from 'src/utils/http-response';
import { User as IUser } from '../users/interfaces/user.interface';
import { Role } from '../acl/entities/role.entity';
import { Acl } from '../acl/entities/acl.entity';
import { Modules } from '../acl/entities/module.entity';
import { Person } from '../people/entities/person.entity';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { RequestPasswordDto } from './dto/request-password.dto';
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
        {
          model: Person,
          attributes: ['id', 'name', 'avatar'],
        },
      ],
    });
    if (!user || !compareSync(password, user.password)) {
      throw HttpResponse.badRequest('Dados incorretos!');
    }
    let userDecode = user.toJSON() as IUser;
    //TODO: Fix exclude field on User Entity
    userDecode = { ...userDecode, ...userDecode.person };
    delete userDecode.password;
    delete userDecode.person;
    let acl = [];
    let modules = [];
    //TODO: Refactory!!!
    userDecode.roles.map((role: any) => {
      const aclToGuard = role.acl
        .reduce((acc, current) => {
          const keys = Object.keys(current);
          const arrays = keys
            .join(`_${current.module.description},`)
            .split(',');
          arrays.pop();
          acc = [...arrays, ...acc];
          delete current.module.createdAt;
          delete current.module.updatedAt;
          delete current.module.description;
          modules = [...modules, current.module];
          return acc;
        }, [])
        .map((acl: string) => acl.toUpperCase().replace('IS', ''));

      acl = [...acl, ...aclToGuard];

      delete role.RoleUser;
      delete role.acl;
      return role;
    });
    return {
      acl: [...new Set(acl)],
      ...userDecode,
      modules: this.removeDuplicateModule(modules),
    };
  }

  async requestPassword({ login }: RequestPasswordDto) {
    const user = await this.userModel.findOne({
      where: { login },
      include: [Person],
    });
    if (!user) {
      return null;
    }
    const random = await promisify(randomBytes)(16);
    const rememberToken = random.toString('hex');

    await user.update({ rememberToken });

    return { email: user.person.email, rememberToken };
  }

  private removeDuplicateModule(duplicates): Array<any> {
    const map = {};
    const uniqueArr = [];
    duplicates.forEach((duplicate) => {
      if (!map[JSON.stringify(duplicate)]) {
        map[JSON.stringify(duplicate)] = true;
        uniqueArr.push(duplicate);
      }
    });
    return uniqueArr;
  }
}
