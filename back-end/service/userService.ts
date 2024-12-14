import prisma from '../repository/prisma/prismaClient';
import { User, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export const getAllUsers = async (): Promise<Omit<User, 'password'>[]> => {
    const users = await prisma.user.findMany({
      include: {
        assignments: true,
        progresses: true,
      },
    });
    return users.map(({ password, ...rest }) => rest);
  };
  
  export const getUserById = async (id: number): Promise<Omit<User, 'password'> | null> => {
    const user = await prisma.user.findUnique({
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
  
  export const createUser = async (data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      include: {
        assignments: true,
        progresses: true,
      },
    });
    const { password, ...rest } = user;
    return rest;
  };
  
  export const updateUser = async (id: number, data: Prisma.UserUpdateInput): Promise<Omit<User, 'password'> | null> => {
    if (data.password) {
      data.password = await bcrypt.hash(data.password as string, 10);
    }
  
    const user = await prisma.user.update({
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
  
  export const deleteUser = async (id: number): Promise<Omit<User, 'password'> | null> => {
    const user = await prisma.user.delete({
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
  
