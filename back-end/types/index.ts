import { Role, Assignment, Progress } from '@prisma/client';

type UserInput = {
  id?: number;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  assignments: Assignment[];
  progresses: Progress[];
};

type AuthenticationResponse = {
  token: string;
  username: string;
  fullname: string;
};

export interface UpdateUserRoleInput {
  role: Role;
}

export { UserInput, AuthenticationResponse };