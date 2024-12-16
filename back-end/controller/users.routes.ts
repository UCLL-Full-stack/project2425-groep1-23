import express, { NextFunction, Request, Response } from 'express';
import { User as PrismaUser } from '@prisma/client';
import * as userService from '../service/userService';
import { UserInput } from '../types';
import { validateUserCreation, validateUserUpdate } from '../middleware/validation/usersValidation';
import { validateRequest } from '../middleware/validateRequest';
import { param } from 'express-validator';

const usersRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: ['USER', 'ADMIN', 'STUDENT', 'TEACHER']
 *         assignments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Assignment'
 *         progresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Progress'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     NewUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: ['USER', 'ADMIN', 'STUDENT', 'TEACHER']
 *     UpdateUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: ['USER', 'ADMIN', 'STUDENT', 'TEACHER']
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         username:
 *           type: string
 *         fullname:
 *           type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
usersRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: Omit<PrismaUser, 'password'>[] = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
usersRouter.get('/:id', param('id').isInt().withMessage('ID must be an integer'), validateRequest, async (req: Request, res: Response, next: NextFunction) => {
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
});

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
usersRouter.post('/', validateUserCreation, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;

  try {
    const newUser: Omit<PrismaUser, 'password'> = await userService.createUser({
      email,
      password,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      assignments: [],
      progresses: [],
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Failed to create user' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
usersRouter.put('/:id', validateUserUpdate, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
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
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
usersRouter.delete('/:id', param('id').isInt().withMessage('ID must be an integer'), validateRequest, async (req: Request, res: Response, next: NextFunction) => {
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
});

/**
 * @swagger
 * /users/signup:
 *  post:
 *   summary: Create a user
 *   tags: [Users]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/NewUser'
 *         example:
 *           email: "example@example.com"
 *           password: "password123"
 *           role: "USER"
 *   responses:
 *     200:
 *       description: The created user object.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 */
usersRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInput: UserInput = {
      ...req.body,
      assignments: req.body.assignments || [],
      progresses: req.body.progresses || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = await userService.createUser(userInput);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login using username/password. Returns an object with JWT token and user name when successful.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *             example:
 *              email: "example@example.com"
 *              password: "password123"
 *     responses:
 *       200:
 *         description: The created user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
usersRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInput = <UserInput>req.body;
    const response = await userService.authenticate(userInput);
    res.status(200).json({ message: 'Authentication successful', ...response });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;