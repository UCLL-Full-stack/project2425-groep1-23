import { Request, Response, NextFunction } from 'express';
import { Category } from '@prisma/client';
import * as categoryService from '../service/categoriesService';

/**
 * Retrieves all categories.
 */
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories: Category[] = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

/**
 * Retrieves a single category by ID.
 */
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const category: Category | null = await categoryService.getCategoryById(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

/**
 * Creates a new category.
 */
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body;

  try {
    const newCategory: Category = await categoryService.createCategory({
      name,
      description,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ error: 'Failed to create category' });
  }
};

/**
 * Updates an existing category.
 */
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;

  try {
    const updatedCategory: Category | null = await categoryService.updateCategory(id, {
      name,
      description,
    });

    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found or failed to update' });
    }
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error);
    res.status(400).json({ error: 'Failed to update category' });
  }
};

/**
 * Deletes a category by ID.
 */
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const deletedCategory: Category | null = await categoryService.deleteCategory(id);
    if (deletedCategory) {
      res.json(deletedCategory);
    } else {
      res.status(404).json({ error: 'Category not found or failed to delete' });
    }
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
