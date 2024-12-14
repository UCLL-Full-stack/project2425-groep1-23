import express from 'express';
import prisma from '../repository/prisma/prismaClient';

import { getCategories } from '../controller/categoriesController';

const router = express.Router();

// GET /categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /categories
router.get('/', getCategories);

export default router;
