import { body } from 'express-validator';
import { Role } from '@prisma/client';

/**
 * Validation rules for creating a new user.
 */
export const validateUserCreation = [
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .notEmpty()
    .withMessage('Email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .notEmpty()
    .withMessage('Password is required'),
  body('role')
    .isIn(['USER', 'ADMIN', 'STUDENT', 'TEACHER'])
    .withMessage('Invalid role')
    .notEmpty()
    .withMessage('Role is required'),
];

/**
 * Validation rules for updating an existing user.
 */
export const validateUserUpdate = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['USER', 'ADMIN', 'STUDENT', 'TEACHER'])
    .withMessage('Invalid role'),
];

export const validateUserRoleUpdate = [
  body('role')
    .exists().withMessage('Role is required')
    .isIn(Object.values(Role)).withMessage(`Role must be one of: ${Object.values(Role).join(', ')}`)
];
