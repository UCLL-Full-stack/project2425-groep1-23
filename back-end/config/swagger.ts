import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

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
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['id', 'email', 'role', 'createdAt', 'updatedAt'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the user',
            },
            email: {
              type: 'string',
              description: 'The user\'s email',
            },
            role: {
              type: 'string',
              enum: ['USER', 'ADMIN', 'STUDENT', 'TEACHER'],
              description: 'The user\'s role',
            },
            assignments: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Assignment',
              },
            },
            progresses: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Progress',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the user was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the user was last updated',
            },
          },
        },
        NewUser: {
          type: 'object',
          required: ['email', 'password', 'role'],
          properties: {
            email: {
              type: 'string',
              description: 'The user\'s email',
            },
            password: {
              type: 'string',
              description: 'The user\'s password',
            },
            role: {
              type: 'string',
              enum: ['USER', 'ADMIN', 'STUDENT', 'TEACHER'],
              description: 'The user\'s role',
            },
          },
        },
        UpdateUser: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'The user\'s new email',
            },
            password: {
              type: 'string',
              description: 'The user\'s new password',
            },
            role: {
              type: 'string',
              enum: ['USER', 'ADMIN', 'STUDENT', 'TEACHER'],
              description: 'The user\'s new role',
            },
          },
        },
        AuthenticationRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              description: 'The user\'s email',
            },
            password: {
              type: 'string',
              description: 'The user\'s password',
            },
          },
        },
        AuthenticationResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT token',
            },
            username: {
              type: 'string',
              description: 'The user\'s email',
            },
            fullname: {
              type: 'string',
              description: 'The user\'s full name',
            },
          },
        },
        // Category Schemas
        Category: {
          type: 'object',
          required: ['id', 'name', 'createdAt', 'updatedAt'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the category',
            },
            name: {
              type: 'string',
              description: 'The name of the category',
            },
            description: {
              type: 'string',
              description: 'The description of the category',
            },
            flashcards: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Flashcard',
              },
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
        },
        NewCategory: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              description: 'The name of the category',
            },
            description: {
              type: 'string',
              description: 'The description of the category',
            },
          },
        },
        UpdateCategory: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The new name of the category',
            },
            description: {
              type: 'string',
              description: 'The new description of the category',
            },
          },
        },
        // Flashcard Schemas
        Flashcard: {
          type: 'object',
          required: ['id', 'question', 'answer', 'createdAt', 'updatedAt'],
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
            category: {
              $ref: '#/components/schemas/Category',
            },
            assignments: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Assignment',
              },
            },
            progresses: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Progress',
              },
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
        },
        NewFlashcard: {
          type: 'object',
          required: ['question', 'answer'],
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
        },
        UpdateFlashcard: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              description: 'The new question of the flashcard',
            },
            answer: {
              type: 'string',
              description: 'The new answer of the flashcard',
            },
            categoryId: {
              type: 'integer',
              nullable: true,
              description: 'The new category ID for the flashcard',
            },
          },
        },
        // Assignment Schemas
        Assignment: {
          type: 'object',
          required: ['id', 'userId', 'flashcardId', 'assignedAt'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the assignment',
            },
            userId: {
              type: 'integer',
              description: 'The ID of the user assigned',
            },
            flashcardId: {
              type: 'integer',
              description: 'The ID of the flashcard assigned',
            },
            assignedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the flashcard was assigned',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
            flashcard: {
              $ref: '#/components/schemas/Flashcard',
            },
          },
        },
        // Progress Schemas
        Progress: {
          type: 'object',
          required: ['id', 'userId', 'flashcardId', 'status'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the progress',
            },
            userId: {
              type: 'integer',
              description: 'The ID of the user',
            },
            flashcardId: {
              type: 'integer',
              description: 'The ID of the flashcard',
            },
            status: {
              type: 'string',
              enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'],
              description: 'The status of the flashcard progress',
            },
            lastReviewed: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'The date the flashcard was last reviewed',
            },
            timesReviewed: {
              type: 'integer',
              description: 'The number of times the flashcard has been reviewed',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
            flashcard: {
              $ref: '#/components/schemas/Flashcard',
            },
          },
        },
      },
    },
  },
  apis: [
    path.resolve(__dirname, '../routes/*.ts'),
    path.resolve(__dirname, '../controller/*.ts'),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;