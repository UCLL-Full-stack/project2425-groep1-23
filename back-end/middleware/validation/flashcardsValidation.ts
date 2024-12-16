import { body } from 'express-validator';

/**
 * Validation rules for creating a new flashcard.
 */
export const validateFlashcardCreation = [
  body('question')
    .isString()
    .withMessage('Question must be a string')
    .notEmpty()
    .withMessage('Question is required'),
  body('answer')
    .isString()
    .withMessage('Answer must be a string')
    .notEmpty()
    .withMessage('Answer is required'),
  body('categoryId')
    .optional({ nullable: true })
    .isInt({ gt: 0 })
    .withMessage('Category ID must be a positive integer'),
];

/**
 * Validation rules for updating an existing flashcard.
 */
export const validateFlashcardUpdate = [
  body('question')
    .optional()
    .isString()
    .withMessage('Question must be a string')
    .notEmpty()
    .withMessage('Question cannot be empty'),
  body('answer')
    .optional()
    .isString()
    .withMessage('Answer must be a string')
    .notEmpty()
    .withMessage('Answer cannot be empty'),
  body('categoryId')
    .optional({ nullable: true })
    .custom((value) => {
      if (value === null) return true; // Allow null for disconnect
      return Number.isInteger(value) && value > 0;
    })
    .withMessage('Category ID must be a positive integer or null'),
];
