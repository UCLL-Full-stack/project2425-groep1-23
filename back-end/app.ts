import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import prisma from './util/database';
import flashcardsRouter from './controller/flashcards.routes';
import categoriesRouter from './controller/categories.routes';
import usersRouter from './controller/users.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { expressjwt } from 'express-jwt';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/flashcards', flashcardsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);

app.use(
    expressjwt({
       secret: process.env.JWT_SECRET || 'default_secret',
         algorithms: ['HS256'],
     }).unless({  
      path: ['/api-docs', /^\/api-docs\/.*/, '/users/signup', '/users/login', '/status'],
  })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
      res.status(401).json({ status: 'unauthorized', message: err.message });
  } else if (err.name === 'CoursesError') {
      res.status(400).json({ status: 'domain error', message: err.message });
  } else {
      res.status(400).json({ status: 'application error', message: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Back-end server is running on port ${PORT}`);
});

export default app;