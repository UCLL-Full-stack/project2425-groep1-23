import database from '../util/database';
import { User as CustomUser } from '../model/User';
import { User as PrismaUser, Prisma } from '@prisma/client';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

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
  return null;
};

export const createUser = async (data: UserInput): Promise<Omit<PrismaUser, 'password'>> => {
  const existingUser = await userDB.getUserByEmail(data.email);
  if (existingUser) {
    throw new Error(`User with email: ${data.email} already exists`);
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
    throw new Error('User not found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Incorrect password');
  }

  return {
    token: generateJwtToken({ username: email, role: user.role }),
    username: email,
    fullname: `${user.email}`, // Assuming fullname is not available, using email instead
  };
};

export const updateUser = async (id: number, data: Prisma.UserUpdateInput): Promise<Omit<PrismaUser, 'password'> | null> => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password as string, 10);
  }

  const user = await database.user.update({
    where: { id },
    data,
    include: {
      assignments: true,
      progresses: true,
    },
  }).catch(() => null); // Handle not found

  if (user) {
    const { password, ...rest } = user;
    return rest;
  }
  return null;
};

export const deleteUser = async (id: number): Promise<Omit<PrismaUser, 'password'> | null> => {
  const user = await database.user.delete({
    where: { id },
    include: {
      assignments: true,
      progresses: true,
    },
  }).catch(() => null); // Handle not found

  if (user) {
    const { password, ...rest } = user;
    return rest;
  }
  return null;
};