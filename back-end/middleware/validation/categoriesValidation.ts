import { body } from 'express-validator';

/**
 * Validation rules for creating a new category.
 */
export const validateCategoryCreation = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
];

/**
 * Validation rules for updating an existing category.
 */
export const validateCategoryUpdate = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
];
