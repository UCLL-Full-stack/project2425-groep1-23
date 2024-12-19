import { Role } from './Role';
import { Assignment } from './Assignment';
import { Progress } from './Progress';
import { User as PrismaUser } from '@prisma/client';

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
    user: {
      id: number;
      email: string;
      password: string;
      role: Role;
      createdAt: Date;
      updatedAt: Date;
      assignments?: Assignment[];
      progresses?: Progress[];
    }
  ) {
    this.validate(user);

    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.assignments = user.assignments || [];
    this.progresses = user.progresses || [];
  }

  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): Role {
    return this.role;
  }

  getAssignments(): Assignment[] {
    return this.assignments;
  }

  getProgresses(): Progress[] {
    return this.progresses;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  validate(user: {
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    assignments?: Assignment[];
    progresses?: Progress[];
  }) {
    if (!user.email) {
      throw new Error('Email is required');
    }
    if (!user.password) {
      throw new Error('Password is required');
    }
    if (!user.role) {
      throw new Error('Role is required');
    }
    if (!user.createdAt) {
      throw new Error('createdAt is required');
    }
    if (!user.updatedAt) {
      throw new Error('updatedAt is required');
    }
  }

  equals(user: User): boolean {
    return (
      this.email === user.email &&
      this.password === user.password &&
      this.role === user.role &&
      this.createdAt === user.createdAt &&
      this.updatedAt === user.updatedAt &&
      this.assignments === user.assignments &&
      this.progresses === user.progresses
    );
  }

  static from({

    id,

    email,

    password,

    role,

    createdAt,

    updatedAt,

    assignments,

    progresses,

  }: PrismaUser & { assignments: any[]; progresses: any[] }): User {

    return new User({

      id,

      email,

      password,

      role: role as Role,

      createdAt,

      updatedAt,

      assignments: assignments.map((assignment) => new Assignment(
        assignment.id,
        assignment.userId,
        assignment.flashcardId,
        assignment.assignedAt,
        assignment.createdAt,
        assignment.updatedAt
      )),

      progresses: progresses.map((progress) => new Progress(
        progress.id,
        progress.userId,
        progress.flashcardId,
        progress.status,
        progress.timesReviewed,
        progress.lastReviewed,
        progress.createdAt,
        progress.updatedAt
      )),

    });

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