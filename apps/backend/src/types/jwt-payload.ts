import { Role } from '@prisma/client';

export type JwtPayloadWithRole = {
  sub: string;
  role: Role;
  email?: string;
};
