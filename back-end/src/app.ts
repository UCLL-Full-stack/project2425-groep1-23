import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './prismaClient';
import flashcardsRouter from './routes/flashcards';
import categoriesRouter from './routes/categories';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/flashcards', flashcardsRouter);
app.use('/categories', categoriesRouter);

// Get all flashcards
app.get('/flashcards', async (req, res) => {
  try {
    const flashcards = await prisma.flashcard.findMany();
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

// Create a new flashcard
app.post('/flashcards', async (req, res) => {
  const { question, answer, categoryId } = req.body;
  try {
    const newFlashcard = await prisma.flashcard.create({
      data: {
        question,
        answer,
        categoryId,
      },
    });
    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create flashcard' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Back-end server is running on port ${PORT}`);
});