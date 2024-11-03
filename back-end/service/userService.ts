import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      //role: true,
      assignments: true,
      progresses: true,
    },
  });
}
