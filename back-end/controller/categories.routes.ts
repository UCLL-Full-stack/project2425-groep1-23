import express, { NextFunction, Request, Response } from 'express';
import { Category } from '@prisma/client';
import * as categoryService from '../service/categoriesService';
import { validateCategoryCreation, validateCategoryUpdate } from '../middleware/validation/categoriesValidation';
import { validateRequest } from '../middleware/validateRequest';
import { param } from 'express-validator';

const categoriesRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         description:
 *           type: string
 *     NewCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *     UpdateCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
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
categoriesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories: Category[] = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Retrieve a single category by ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Failed to fetch category.
 */
categoriesRouter.get('/:id', param('id').isInt().withMessage('ID must be an integer'), validateRequest, async (req: Request, res: Response, next: NextFunction) => {
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
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
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
categoriesRouter.post('/', validateCategoryCreation, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
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
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategory'
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Failed to update category.
 *       404:
 *         description: Category not found.
 */
categoriesRouter.put('/:id', validateCategoryUpdate, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
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
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Failed to delete category.
 */
categoriesRouter.delete('/:id', param('id').isInt().withMessage('ID must be an integer'), validateRequest, async (req: Request, res: Response, next: NextFunction) => {
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
});

export default categoriesRouter;