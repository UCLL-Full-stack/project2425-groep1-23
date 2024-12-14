import prisma from '../repository/prisma/prismaClient';
import { Category } from '@prisma/client';

// export interface Category {
//   id: number;
//   name: string;
// }

export const getAllCategories = async (): Promise<Category[]> => {
  return await prisma.category.findMany();
};

interface createCategory {
  name: string;
  description?: string;
}

export const createCategory = async (data: createCategory): Promise<Category> => {
  return await prisma.category.create({
    data,
  });
};