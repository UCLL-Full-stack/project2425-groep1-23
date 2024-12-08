import prisma from '../repository/prisma/prismaClient';
import { Flashcard } from '@prisma/client';

// export interface Flashcard {
//   id: number;
//   question: string;
//   answer: string;
//   categoryId: number;
// }

export const getAllFlashcards = async (): Promise<Flashcard[]> => {
  return await prisma.flashcard.findMany();
};

interface CreateFlashcardData {
  question: string;
  answer: string;
  categoryId: number | null;
}

export const createFlashcard = async (data: CreateFlashcardData): Promise<Flashcard> => {
  return await prisma.flashcard.create({
    data,
  });
};