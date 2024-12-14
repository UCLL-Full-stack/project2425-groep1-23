// src/controllers/categoriesController.ts
import { Request, Response, NextFunction } from 'express';
import { Category } from '@prisma/client'; // Prisma's Category type
import * as categoriesService from '../service/categoriesService';

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Failed to fetch categories.
 */
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories: Category[] = await categoriesService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       201:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Failed to create category.
 */
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  try {
    const newCategory: Category = await categoriesService.createCategory({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ error: 'Failed to create category' });
  }
};

