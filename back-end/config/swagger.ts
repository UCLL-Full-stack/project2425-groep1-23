import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flashcards API',
      version: '1.0.0',
      description: 'API documentation for the Flashcards application built with Express and TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    components: {
      schemas: {
        Flashcard: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the flashcard',
            },
            question: {
              type: 'string',
              description: 'The question of the flashcard',
            },
            answer: {
              type: 'string',
              description: 'The answer of the flashcard',
            },
            categoryId: {
              type: 'integer',
              nullable: true,
              description: 'The ID of the category the flashcard belongs to',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the flashcard was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the flashcard was last updated',
            },
          },
          required: ['id', 'question', 'answer', 'createdAt', 'updatedAt'],
        },
        NewFlashcard: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              description: 'The question of the flashcard',
            },
            answer: {
              type: 'string',
              description: 'The answer of the flashcard',
            },
            categoryId: {
              type: 'integer',
              nullable: true,
              description: 'The ID of the category the flashcard belongs to',
            },
          },
          required: ['question', 'answer'],
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the category',
            },
            name: {
              type: 'string',
              description: 'The name of the category',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the category was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the category was last updated',
            },
          },
          required: ['id', 'name', 'createdAt', 'updatedAt'],
        },
        NewCategory: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the category',
            },
          },
          required: ['name'],
        },

      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        security: [
          {
            BearerAuth: [],
          },
        ],
      },
    },
  },
  apis: ['./routes/*.ts', './controller/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
