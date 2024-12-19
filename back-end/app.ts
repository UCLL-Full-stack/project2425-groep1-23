import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import flashcardsRouter from './routes/flashcards';
import categoriesRouter from './routes/categories';
import usersRouter from './routes/users';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/flashcards', flashcardsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;
