import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/users/interfaces/user.interface';
import { ACL_KEY } from '../decorators/acl.decorator';

@Injectable()
export class AclGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    console.log('KDOPASD');
  }

  canActivate(context: ExecutionContext): boolean {
    console.log('LSAPDOAS{P');
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ACL_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const { roles } = user as User;
    // const {acl } = roles as Role;

    // requiredRoles.some((role) => user.roles?.includes(role));
    return true;
  }
}
