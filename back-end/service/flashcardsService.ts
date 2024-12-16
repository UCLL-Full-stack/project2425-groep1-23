import * as flashcardDB from '../repository/flashcard.db';
import { Flashcard, Prisma } from '@prisma/client';

/**
 * Retrieves all flashcards.
 */
export const getAllFlashcards = async (): Promise<Flashcard[]> => {
  return await flashcardDB.getAllFlashcards();
};

/**
 * Retrieves a single flashcard by ID.
 */
export const getFlashcardById = async (id: number): Promise<Flashcard | null> => {
  return await flashcardDB.getFlashcardById(id);
};

/**
 * Creates a new flashcard.
 */
export const createFlashcard = async (data: Prisma.FlashcardCreateInput): Promise<Flashcard> => {
  return await flashcardDB.createFlashcard(data);
};

/**
 * Updates an existing flashcard.
 */
export const updateFlashcard = async (id: number, data: Prisma.FlashcardUpdateInput): Promise<Flashcard | null> => {
  return await flashcardDB.updateFlashcard(id, data);
};

/**
 * Deletes a flashcard by ID.
 */
export const deleteFlashcard = async (id: number): Promise<Flashcard | null> => {
  return await flashcardDB.deleteFlashcard(id);
};