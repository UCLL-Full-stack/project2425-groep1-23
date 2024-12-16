import request from 'supertest';
import app from '../app'; // Ensure your Express app is exported

describe('Flashcards API', () => {
  let createdFlashcardId: number;

  it('should create a new flashcard with category', async () => {
    const res = await request(app)
      .post('/flashcards')
      .send({
        question: 'What is the largest planet?',
        answer: 'Jupiter',
        categoryId: 1, // Assume category with ID 1 exists
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    createdFlashcardId = res.body.id;
    expect(res.body).toHaveProperty('categoryId', 1);
  });

  it('should retrieve the created flashcard', async () => {
    const res = await request(app).get(`/flashcards/${createdFlashcardId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', createdFlashcardId);
    expect(res.body).toHaveProperty('question', 'What is the largest planet?');
  });

  it('should update the flashcard\'s category', async () => {
    const res = await request(app)
      .put(`/flashcards/${createdFlashcardId}`)
      .send({
        categoryId: 2, // Assume category with ID 2 exists
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('categoryId', 2);
  });

  it('should delete the flashcard', async () => {
    const res = await request(app).delete(`/flashcards/${createdFlashcardId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', createdFlashcardId);
  });

  it('should return 404 for deleted flashcard', async () => {
    const res = await request(app).get(`/flashcards/${createdFlashcardId}`);
    expect(res.statusCode).toEqual(404);
  });
});
