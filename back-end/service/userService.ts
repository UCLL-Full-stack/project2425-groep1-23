import database from '../util/database';
import { User as PrismaUser, Prisma} from '@prisma/client';
import { Role } from '../model/Role';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import { BadRequestError} from '../errors/BadRequestError';
import { NotFoundError} from '../errors/NotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const getAllUsers = async (): Promise<Omit<PrismaUser, 'password'>[]> => {
  const users = await database.user.findMany({
    include: {
      assignments: true,
      progresses: true,
    },
  });
  return users.map(({ password, ...rest }) => rest);
};

export const getUserById = async (id: number): Promise<Omit<PrismaUser, 'password'> | null> => {
  const user = await database.user.findUnique({
    where: { id },
    include: {
      assignments: true,
      progresses: true,
    },
  });
  if (user) {
    const { password, ...rest } = user;
    return rest;
  }
  throw new NotFoundError(`User with ID ${id} not found`);
};

export const createUser = async (data: UserInput): Promise<Omit<PrismaUser, 'password'>> => {
  const existingUser = await userDB.getUserByEmail(data.email);
  if (existingUser) {
    throw new BadRequestError(`User with email ${data.email} already exists`);
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await database.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role,
      assignments: {
        create: data.assignments.map((assignment) => ({
          flashcardId: assignment.flashcardId,
          assignedAt: assignment.assignedAt,
        })),
      },
      progresses: {
        create: data.progresses.map((progress) => ({
          flashcardId: progress.flashcardId,
          status: progress.status,
          timesReviewed: progress.timesReviewed,
          lastReviewed: progress.lastReviewed,
        })),
      },
    },
    include: {
      assignments: true,
      progresses: true,
    },
  });
  const { password, ...rest } = user;
  return rest;
};

export const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
  const user = await userDB.getUserByEmail(email);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new UnauthorizedError('Incorrect password');
  }

  return {
    token: generateJwtToken({ username: email, role: user.role }),
    username: email,
    fullname: `${user.email}`,
  };
};

export const updateUser = async (id: number, data: Prisma.UserUpdateInput): Promise<Omit<PrismaUser, 'password'> | null> => {
  const existingUser = await userDB.getUserById(id);

  if (!existingUser) {
    throw new NotFoundError(`User with ID ${id} not found`);
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password as string, 10);
  }

  try {
    const user = await database.user.update({
      where: { id },
      data,
      include: {
        assignments: true,
        progresses: true,
      },
    });
    const { password, ...rest } = user;
    return rest;
  } catch (error) {
    throw new BadRequestError('Failed to update user', error);
  }
};

export const deleteUser = async (id: number): Promise<Omit<PrismaUser, 'password'> | null> => {
  const existingUser = await database.user.findUnique({ where: { id } });
  if (!existingUser) {
    throw new NotFoundError(`User with ID ${id} not found`);
  }
  
  try {
    const user = await database.user.delete({
      where: { id },
      include: {
        assignments: true,
        progresses: true,
      },
    });
    const { password, ...rest } = user;
    return rest;
  } catch (error) {
    throw new BadRequestError('Failed to delete user', error);
  }
};

export const updateUserRole = async (id: number, role: Role): Promise<PrismaUser | null> => {
  // Optional: Add authorization logic here to ensure only certain roles can perform this action

  // Update the role using the repository
  const updatedUser = await userDB.updateUserRole(id, role);
  if (!updatedUser) {
      throw new NotFoundError(`User with ID ${id} not found`);
  }

  return updatedUser;
};
