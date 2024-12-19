import express, { NextFunction, Request, Response } from 'express';
import { Flashcard, Prisma } from '@prisma/client';
import * as flashcardsService from '../service/flashcardsService';
// import { validateFlashcardCreation, validateFlashcardUpdate } from '../middleware/validation/flashcardsValidation';
// import { validateRequest } from '../middleware/validateRequest';
import { param } from 'express-validator';

const flashcardsRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Flashcard:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *         categoryId:
 *           type: number
 *           format: int64
 *     NewFlashcard:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *         categoryId:
 *           type: number
 *           format: int64
 *     UpdateFlashcard:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *         categoryId:
 *           type: number
 *           format: int64
 */

/**
 * @swagger
 * /flashcards:
 *   get:
 *     summary: Retrieve a list of flashcards
 *     tags: [Flashcards]
 *     security:
 *       - BearerAuth: []
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
 */
flashcardsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flashcards: Flashcard[] = await flashcardsService.getAllFlashcards();
    res.json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

/**
 * @swagger
 * /flashcards/{id}:
 *   get:
 *     summary: Retrieve a single flashcard by ID
 *     tags: [Flashcards]
 *     security:
 *       - BearerAuth: []
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
 */
flashcardsRouter.get('/:id', param('id').isInt().withMessage('ID must be an integer'), async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const flashcard: Flashcard | null = await flashcardsService.getFlashcardById(id);
    if (flashcard) {
      res.json(flashcard);
    } else {
      res.status(404).json({ error: 'Flashcard not found' });
    }
  } catch (error) {
    console.error(`Error fetching flashcard with id ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch flashcard' });
  }
});

/**
 * @swagger
 * /flashcards:
 *   post:
 *     summary: Create a new flashcard
 *     tags: [Flashcards]
 *     security:
 *       - BearerAuth: []
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
flashcardsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { question, answer, categoryId } = req.body;

  try {
    const flashcardData: Prisma.FlashcardCreateInput = {
      question,
      answer,
      category: categoryId
        ? {
            connect: { id: categoryId },
          }
        : undefined, // If categoryId is not provided, do not connect to any category
    };

    const newFlashcard: Flashcard = await flashcardsService.createFlashcard(flashcardData);
    res.status(201).json(newFlashcard);
  } catch (error) {
    console.error('Error creating flashcard:', error);
    res.status(400).json({ error: 'Failed to create flashcard' });
  }
});

/**
 * @swagger
 * /flashcards/{id}:
 *   put:
 *     summary: Update an existing flashcard
 *     tags: [Flashcards]
 *     security:
 *       - BearerAuth: []
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
 */
flashcardsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const { question, answer, categoryId } = req.body;

  try {
    const flashcardUpdateData: Prisma.FlashcardUpdateInput = {
      question,
      answer,
      category: categoryId !== undefined
        ? categoryId !== null
          ? {
              connect: { id: categoryId },
            }
          : {
              disconnect: true,
            }
        : undefined, // If categoryId is undefined, do not modify the category relation
    };

    const updatedFlashcard: Flashcard | null = await flashcardsService.updateFlashcard(id, flashcardUpdateData);

    if (updatedFlashcard) {
      res.json(updatedFlashcard);
    } else {
      res.status(404).json({ error: 'Flashcard not found or failed to update' });
    }
  } catch (error) {
    console.error(`Error updating flashcard with id ${id}:`, error);
    res.status(400).json({ error: 'Failed to update flashcard' });
  }
});

/**
 * @swagger
 * /flashcards/{id}:
 *   delete:
 *     summary: Delete a flashcard by ID
 *     tags: [Flashcards]
 *     security:
 *       - BearerAuth: []
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
flashcardsRouter.delete('/:id', param('id').isInt().withMessage('ID must be an integer'), async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const deletedFlashcard: Flashcard | null = await flashcardsService.deleteFlashcard(id);
    if (deletedFlashcard) {
      res.json(deletedFlashcard);
    } else {
      res.status(404).json({ error: 'Flashcard not found or failed to delete' });
    }
  } catch (error) {
    console.error(`Error deleting flashcard with id ${id}:`, error);
    res.status(500).json({ error: 'Failed to delete flashcard' });
  }
});

export default flashcardsRouter;