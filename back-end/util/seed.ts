import { PrismaClient, Role, Status } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
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

  const users = [
    {
      email: 'admin@example.com',
      password: 'securepassword123',
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

  const seedUsers = async () => {
    try {
      for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        await prisma.user.upsert({
          where: { email: user.email },
          update: {},
          create: {
            email: user.email,
            password: hashedPassword,
            role: user.role,
          },
        });
      }
  
      console.log('Users seeded successfully');
    } catch (error) {
      console.error('Error seeding users:', error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  };
  
  seedUsers();

  console.log('Users seeded successfully!');

  const scienceCategory = await prisma.category.findUnique({ where: { name: 'Science' } });
  const mathCategory = await prisma.category.findUnique({ where: { name: 'Mathematics' } });
  const historyCategory = await prisma.category.findUnique({ where: { name: 'History' } });

  const adminUser = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
  const studentUser = await prisma.user.findUnique({ where: { email: 'student1@example.com' } });
  const teacherUser = await prisma.user.findUnique({ where: { email: 'teacher1@example.com' } });

  const flashcards = [
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

  const allFlashcards = await prisma.flashcard.findMany();
  const assignments = [
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
