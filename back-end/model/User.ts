import { Role } from './Role';
import { Assignment } from './Assignment';
import { Progress } from './Progress';

export class User {
  id: number;
  email: string;
  password: string;
  role: Role;
  assignments: Assignment[];
  progresses: Progress[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    email: string,
    password: string,
    role: Role,
    createdAt: Date,
    updatedAt: Date,
    assignments: Assignment[] = [],
    progresses: Progress[] = []
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.assignments = assignments;
    this.progresses = progresses;
  }

  updateEmail(newEmail: string): void {
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  addAssignment(assignment: Assignment): void {
    this.assignments.push(assignment);
    this.updatedAt = new Date();
  }
}
