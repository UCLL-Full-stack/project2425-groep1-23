import prisma from '../repository/prisma/prismaClient';
import { User, Prisma, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { AuthorizationError, ValidationError } from '../errors';

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
    }).catch(() => null);
  
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
    }).catch(() => null);
  
    if (user) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  };

  /**
 * Updates a user's role.
 * @param id - The ID of the user to update.
 * @param role - The new role to assign.
 * @returns The updated user without the password, or null if not found.
 */
  export const updateUserRole = async (id: number, role: Role): Promise<Omit<User, 'password'> | null> => {
    if (!Object.values(Role).includes(role)) {
        throw new ValidationError(`Role must be one of: ${Object.values(Role).join(', ')}`);
    }

    try {
        const user = await prisma.user.update({
            where: { id },
            data: { role },
            include: {
                assignments: true,
                progresses: true,
            },
        });

        const { password, ...rest } = user;
        return rest;
    } catch (error: any) {
        if (error.code === 'P2025') { // Prisma's "Record not found" error code
            return null;
        }
        throw error;
    }
};

export const authenticateUser = async (
  email: string,
  password: string
): Promise<Omit<User, 'password'> | null> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const tokenBlacklist: Set<string> = new Set();

/**
 * Invalidates a JWT by adding it to the blacklist.
 * @param token - The JWT to invalidate.
 */
export const invalidateToken = async (token: string): Promise<void> => {
  console.log('Invalidating token:', token);
  tokenBlacklist.add(token);
  console.log('Current blacklist:', Array.from(tokenBlacklist));
};

/**
 * Checks if a JWT is invalidated.
 * @param token - The JWT to check.
 * @returns `true` if the token is invalidated, otherwise `false`.
 */
export const isTokenInvalidated = (token: string): boolean => {
  console.log('Checking if token is invalidated:', token);
  return tokenBlacklist.has(token);  
};
  
