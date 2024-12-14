import { Request, Response, NextFunction } from 'express';
import { Flashcard, Prisma } from '@prisma/client';
import * as flashcardsService from '../service/flashcardsService';

/**
 * Retrieves all flashcards.
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
 * Retrieves a single flashcard by ID.
 */
export const getFlashcardById = async (req: Request, res: Response, next: NextFunction) => {
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
};

/**
 * Creates a new flashcard.
 */
export const createFlashcard = async (req: Request, res: Response, next: NextFunction) => {
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
};

/**
 * Updates an existing flashcard.
 */
export const updateFlashcard = async (req: Request, res: Response, next: NextFunction) => {
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
};

/**
 * Deletes a flashcard by ID.
 */
export const deleteFlashcard = async (req: Request, res: Response, next: NextFunction) => {
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
};
