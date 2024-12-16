import { PrismaClient, Role, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Categories
  const categories = [
    { name: 'Science', description: 'Science-related flashcards' },
    { name: 'Mathematics', description: 'Math-related flashcards' },
    { name: 'History', description: 'History-related flashcards' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log('Categories seeded successfully!');

  // Seed Users
  const users = [
    {
      email: 'admin@example.com',
      password: 'securepassword123', // In production, ensure passwords are hashed
      role: Role.ADMIN,
    },
    {
      email: 'student1@example.com',
      password: 'studentpassword',
      role: Role.STUDENT,
    },
    {
      email: 'teacher1@example.com',
      password: 'teacherpassword',
      role: Role.TEACHER,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('Users seeded successfully!');

  // Fetch Categories and Users for relationships
  const scienceCategory = await prisma.category.findUnique({ where: { name: 'Science' } });
  const mathCategory = await prisma.category.findUnique({ where: { name: 'Mathematics' } });
  const historyCategory = await prisma.category.findUnique({ where: { name: 'History' } });

  const adminUser = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
  const studentUser = await prisma.user.findUnique({ where: { email: 'student1@example.com' } });
  const teacherUser = await prisma.user.findUnique({ where: { email: 'teacher1@example.com' } });

  // Seed Flashcards
  const flashcards = [
    // Science Flashcards
    {
      question: 'What is the chemical symbol for water?',
      answer: 'H₂O',
      categoryId: scienceCategory?.id,
    },
    {
      question: 'What planet is known as the Red Planet?',
      answer: 'Mars',
      categoryId: scienceCategory?.id,
    },
    // Mathematics Flashcards
    {
      question: 'What is the value of π (pi) up to two decimal places?',
      answer: '3.14',
      categoryId: mathCategory?.id,
    },
    {
      question: 'What is the solution to the equation 2x + 3 = 7?',
      answer: 'x = 2',
      categoryId: mathCategory?.id,
    },
    // History Flashcards
    {
      question: 'Who was the first President of the United States?',
      answer: 'George Washington',
      categoryId: historyCategory?.id,
    },
    {
      question: 'In which year did World War II end?',
      answer: '1945',
      categoryId: historyCategory?.id,
    },
  ];

  for (const flashcard of flashcards) {
    await prisma.flashcard.upsert({
      where: { question: flashcard.question },
      update: {},
      create: flashcard,
    });
  }

  console.log('Flashcards seeded successfully!');

  // Seed Assignments
  const allFlashcards = await prisma.flashcard.findMany();
  const assignments = [
    // Assign some flashcards to studentUser
    {
      userId: studentUser?.id!,
      flashcardId: allFlashcards.find(fc => fc.question === 'What is the chemical symbol for water?')?.id!,
      assignedAt: new Date(),
    },
    {
      userId: studentUser?.id!,
      flashcardId: allFlashcards.find(fc => fc.question === 'What is the value of π (pi) up to two decimal places?')?.id!,
      assignedAt: new Date(),
    },
    // Assign some flashcards to teacherUser
    {
      userId: teacherUser?.id!,
      flashcardId: allFlashcards.find(fc => fc.question === 'Who was the first President of the United States?')?.id!,
      assignedAt: new Date(),
    },
  ];

  for (const assignment of assignments) {
    await prisma.assignment.upsert({
      where: {
        userId_flashcardId: {
          userId: assignment.userId,
          flashcardId: assignment.flashcardId,
        },
      },
      update: {},
      create: assignment,
    });
  }

  console.log('Assignments seeded successfully!');

  // Seed Progress
  const progresses = [
    {
      userId: studentUser?.id!,
      flashcardId: allFlashcards.find(fc => fc.question === 'What is the chemical symbol for water?')?.id!,
      status: Status.COMPLETED,
      lastReviewed: new Date(),
      timesReviewed: 3,
    },
    {
      userId: studentUser?.id!,
      flashcardId: allFlashcards.find(fc => fc.question === 'What is the value of π (pi) up to two decimal places?')?.id!,
      status: Status.IN_PROGRESS,
      lastReviewed: new Date(),
      timesReviewed: 1,
    },
    {
      userId: teacherUser?.id!,
      flashcardId: allFlashcards.find(fc => fc.question === 'Who was the first President of the United States?')?.id!,
      status: Status.NOT_STARTED,
      timesReviewed: 0,
    },
  ];

  for (const progress of progresses) {
    await prisma.progress.upsert({
      where: {
        userId_flashcardId: {
          userId: progress.userId,
          flashcardId: progress.flashcardId,
        },
      },
      update: {},
      create: progress,
    });
  }

  console.log('Progress seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
