import express from 'express';
import prisma from '../repository/prisma/prismaClient';

import {
  getFlashcards,
  createFlashcard,
} from '../controller/flashcardsController';

const router = express.Router();

// Existing GET endpoints...

// POST /flashcards - Create a new flashcard
router.post('/', async (req, res) => {
  const { question, answer, categoryId } = req.body;

  try {
    const newFlashcard = await prisma.flashcard.create({
      data: {
        question,
        answer,
        categoryId: categoryId || null,
      },
    });
    res.status(201).json(newFlashcard);
  } catch (error) {
    console.error('Error creating flashcard:', error);
    res.status(400).json({ error: 'Failed to create flashcard' });
  }
});

// GET /flashcards/:id - Get a flashcard by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const flashcard = await prisma.flashcard.findUnique({
      where: { id: Number(id) },
    });

    if (flashcard) {
      res.json(flashcard);
    } else {
      res.status(404).json({ error: 'Flashcard not found' });
    }
  } catch (error) {
    console.error('Error fetching flashcard:', error);
    res.status(500).json({ error: 'Failed to fetch flashcard' });
  }
});

// GET /flashcards
router.get('/', getFlashcards);

// POST /flashcards
router.post('/', createFlashcard);


export default router;
