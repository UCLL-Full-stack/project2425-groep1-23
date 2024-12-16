import prisma from '../util/database';
import { Flashcard, Prisma } from '@prisma/client';

/**
 * Retrieves all flashcards.
 */
export const getAllFlashcards = async (): Promise<Flashcard[]> => {
  return await prisma.flashcard.findMany({
    include: {
      category: true,
      assignments: true,
      progresses: true,
    },
  });
};

/**
 * Retrieves a single flashcard by ID.
 */
export const getFlashcardById = async (id: number): Promise<Flashcard | null> => {
  return await prisma.flashcard.findUnique({
    where: { id },
    include: {
      category: true,
      assignments: true,
      progresses: true,
    },
  });
};

/**
 * Creates a new flashcard.
 */
export const createFlashcard = async (data: Prisma.FlashcardCreateInput): Promise<Flashcard> => {
  return await prisma.flashcard.create({
    data,
    include: {
      category: true,
      assignments: true,
      progresses: true,
    },
  });
};

/**
 * Updates an existing flashcard.
 */
export const updateFlashcard = async (id: number, data: Prisma.FlashcardUpdateInput): Promise<Flashcard | null> => {
  try {
    return await prisma.flashcard.update({
      where: { id },
      data,
      include: {
        category: true,
        assignments: true,
        progresses: true,
      },
    });
  } catch (error) {
    console.error(`Error updating flashcard with id ${id}:`, error);
    return null;
  }
};

/**
 * Deletes a flashcard by ID.
 */
export const deleteFlashcard = async (id: number): Promise<Flashcard | null> => {
  try {
    return await prisma.flashcard.delete({
      where: { id },
      include: {
        category: true,
        assignments: true,
        progresses: true,
      },
    });
  } catch (error) {
    console.error(`Error deleting flashcard with id ${id}:`, error);
    return null;
  }
};