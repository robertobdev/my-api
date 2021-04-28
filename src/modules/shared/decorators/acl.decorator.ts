import { SetMetadata } from '@nestjs/common';

export const ACL_KEY = 'acl';
export const Acl = (...args: [string]) => SetMetadata(ACL_KEY, args);
