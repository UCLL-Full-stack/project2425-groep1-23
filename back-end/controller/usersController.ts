import { Request, Response, NextFunction } from 'express';
import { User as PrismaUser } from '@prisma/client';
import * as userService from '../service/userService';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for users management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Failed to fetch users.
 */

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: Omit<PrismaUser, 'password'>[] = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to fetch user.
 */
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

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Failed to create user.
 */
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

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Failed to update user.
 *       404:
 *         description: User not found.
 */
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to delete user.
 */
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