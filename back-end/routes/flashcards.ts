import express from 'express';
import * as flashcardsController from '../controller/flashcardsController';
import { validateFlashcardCreation, validateFlashcardUpdate } from '../middleware/validation/flashcardsValidation';
import { validateRequest } from '../middleware/validateRequest';
import { param } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Flashcards
 *   description: API endpoints for managing flashcards
 */

/**
 * @swagger
 * /flashcards:
 *   get:
 *     summary: Retrieve a list of flashcards
 *     tags: [Flashcards]
 *     responses:
 *       200:
 *         description: A list of flashcards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flashcard'
 *       500:
 *         description: Failed to fetch flashcards.
 *   post:
 *     summary: Create a new flashcard
 *     tags: [Flashcards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFlashcard'
 *     responses:
 *       201:
 *         description: Flashcard created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       400:
 *         description: Failed to create flashcard.
 */
router.get('/', flashcardsController.getFlashcards);

router.post('/', validateFlashcardCreation, validateRequest, flashcardsController.createFlashcard);

/**
 * @swagger
 * /flashcards/{id}:
 *   get:
 *     summary: Retrieve a single flashcard by ID
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the flashcard to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flashcard found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       404:
 *         description: Flashcard not found.
 *       500:
 *         description: Failed to fetch flashcard.
 *   put:
 *     summary: Update an existing flashcard
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the flashcard to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFlashcard'
 *     responses:
 *       200:
 *         description: Flashcard updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       400:
 *         description: Failed to update flashcard.
 *       404:
 *         description: Flashcard not found.
 *   delete:
 *     summary: Delete a flashcard by ID
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the flashcard to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flashcard deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       404:
 *         description: Flashcard not found.
 *       500:
 *         description: Failed to delete flashcard.
 */
router.get('/:id', 
  param('id').isInt().withMessage('ID must be an integer'), 
  validateRequest, 
  flashcardsController.getFlashcardById
);

router.put('/:id', validateFlashcardUpdate, validateRequest, flashcardsController.updateFlashcard);

router.delete('/:id', 
  param('id').isInt().withMessage('ID must be an integer'), 
  validateRequest, 
  flashcardsController.deleteFlashcard
);

export default router;
