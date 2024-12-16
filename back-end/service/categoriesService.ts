import prisma from '../util/database';
import { Category, Prisma } from '@prisma/client';

/**
 * Retrieves all categories.
 */
export const getAllCategories = async (): Promise<Category[]> => {
  return await prisma.category.findMany({
    include: {
      flashcards: true,
    },
  });
};

/**
 * Retrieves a single category by ID.
 */
export const getCategoryById = async (id: number): Promise<Category | null> => {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      flashcards: true,
    },
  });
};

/**
 * Creates a new category.
 */
export const createCategory = async (data: Prisma.CategoryCreateInput): Promise<Category> => {
  return await prisma.category.create({
    data,
    include: {
      flashcards: true,
    },
  });
};

/**
 * Updates an existing category.
 */
export const updateCategory = async (id: number, data: Prisma.CategoryUpdateInput): Promise<Category | null> => {
  try {
    return await prisma.category.update({
      where: { id },
      data,
      include: {
        flashcards: true,
      },
    });
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error);
    return null;
  }
};

/**
 * Deletes a category by ID.
 */
export const deleteCategory = async (id: number): Promise<Category | null> => {
  try {
    return await prisma.category.delete({
      where: { id },
      include: {
        flashcards: true,
      },
    });
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    return null;
  }
};
