import * as categoryDB from '../repository/categories.db';
import { Category, Prisma } from '@prisma/client';

/**
 * Retrieves all categories.
 */
export const getAllCategories = async (): Promise<Category[]> => {
  return await categoryDB.getAllCategories();
};

/**
 * Retrieves a single category by ID.
 */
export const getCategoryById = async (id: number): Promise<Category | null> => {
  return await categoryDB.getCategoryById(id);
};

/**
 * Creates a new category.
 */
export const createCategory = async (data: Prisma.CategoryCreateInput): Promise<Category> => {
  return await categoryDB.createCategory(data);
};

/**
 * Updates an existing category.
 */
export const updateCategory = async (id: number, data: Prisma.CategoryUpdateInput): Promise<Category | null> => {
  return await categoryDB.updateCategory(id, data);
};

/**
 * Deletes a category by ID.
 */
export const deleteCategory = async (id: number): Promise<Category | null> => {
  return await categoryDB.deleteCategory(id);
};