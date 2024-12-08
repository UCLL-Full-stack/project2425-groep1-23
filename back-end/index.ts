import { PrismaClient, User, Flashcard, Assignment, Category, Progress, Role, Status } from '@prisma/client';
import prisma from './repository/prisma/prismaClient';

async function main() {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      password: 'password123',
      role: Role.USER,
    },
  });
  console.log('Created user:', user);

  // Create a new category
  const category = await prisma.category.create({
    data: {
      name: 'Science',
      description: 'Science flashcards',
    },
  });
  console.log('Created category:', category);

  // Create a new flashcard
  const flashcard = await prisma.flashcard.create({
    data: {
      question: 'What is the boiling point of water?',
      answer: '100°C',
      categoryId: category.id,
    },
  });
  console.log('Created flashcard:', flashcard);

  // Assign flashcard to user
  const assignment = await prisma.assignment.create({
    data: {
      userId: user.id,
      flashcardId: flashcard.id,
    },
  });
  console.log('Created assignment:', assignment);

  // Update progress
  const progress = await prisma.progress.create({
    data: {
      userId: user.id,
      flashcardId: flashcard.id,
      status: Status.IN_PROGRESS,
      timesReviewed: 1,
    },
  });
  console.log('Updated progress:', progress);

  // Fetch user with related data
  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      assignments: true,
      progresses: true,
    },
  });
  console.log('User data:', userData);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
