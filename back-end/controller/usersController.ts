import { Request, Response, NextFunction } from 'express';
import { User as PrismaUser } from '@prisma/client';
import * as userService from '../service/userService';
import { AuthorizationError, ValidationError } from '../errors';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRATION = '1h';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: Omit<PrismaUser, 'password'>[] = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
  
    try {
      const user: Omit<PrismaUser, 'password'> | null = await userService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;
  
    try {
      const newUser: Omit<PrismaUser, 'password'> = await userService.createUser({
        email,
        password,
        role,
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ error: 'Failed to create user' });
    }
  };

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const { email, password, role } = req.body;
  
    try {
      const updatedUser: Omit<PrismaUser, 'password'> | null = await userService.updateUser(id, {
        email,
        password,
        role,
      });
  
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      res.status(400).json({ error: 'Failed to update user' });
    }
  };


export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
  
    try {
      const deletedUser: Omit<PrismaUser, 'password'> | null = await userService.deleteUser(id);
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };

export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const { role } = req.body;

  try {
      const updatedUser: Omit<PrismaUser, 'password'> | null = await userService.updateUserRole(id, role);
      if (updatedUser) {
          res.json(updatedUser);
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error: any) {
      console.error(`Error updating role for user with id ${id}:`, error);
      if (error instanceof AuthorizationError) { // Assuming you have a custom error
          res.status(403).json({ error: 'Unauthorized to change user roles' });
      } else if (error instanceof ValidationError) { // Assuming you have a custom error
          res.status(400).json({ error: error.message });
      } else {
          res.status(500).json({ error: 'Failed to update user role' });
      }
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await userService.authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    jwt.verify(token, JWT_SECRET);

    await userService.invalidateToken(token);

    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};