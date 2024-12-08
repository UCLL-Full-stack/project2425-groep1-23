import { Request, Response, NextFunction } from 'express';
import { Flashcard } from '@prisma/client';
import * as flashcardsService from '../service/flashcardsService';

/**
 * @swagger
 * tags:
 *   name: Flashcards
 *   description: API for flashcards management
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
 */
export const getFlashcards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flashcards: Flashcard[] = await flashcardsService.getAllFlashcards();
    res.json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
};

/**
 * @swagger
 * /flashcards:
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
export const createFlashcard = async (req: Request, res: Response, next: NextFunction) => {
  const { question, answer, categoryId } = req.body;

  // Handle potential null value for categoryId
  const parsedCategoryId = categoryId !== undefined ? categoryId : null;

  try {
    const newFlashcard: Flashcard = await flashcardsService.createFlashcard({
      question,
      answer,
      categoryId: parsedCategoryId,
    });
    res.status(201).json(newFlashcard);
  } catch (error) {
    console.error('Error creating flashcard:', error);
    res.status(400).json({ error: 'Failed to create flashcard' });
  }
};
