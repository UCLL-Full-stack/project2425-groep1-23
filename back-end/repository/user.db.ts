import { User } from '../model/User';
import database from '../util/database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                assignments: {
                    include: {
                        user: true,
                        flashcard: true,
                    },
                },
                progresses: {
                    include: {
                        user: true,
                        flashcard: true,
                    },
                },
            },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: {
                assignments: true,
                progresses: true,
            },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { email },
            include: {
                assignments: true,
                progresses: true,
            },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async ({
    email,
    password,
    role,
    createdAt,
    updatedAt,
    assignments,
    progresses,
}: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                email,
                password,
                role,
                createdAt,
                updatedAt,
                assignments: {
                    create: assignments.map((assignment) => ({
                        flashcardId: assignment.flashcardId,
                        assignedAt: assignment.assignedAt,
                    })),
                },
                progresses: {
                    create: progresses.map((progress) => ({
                        flashcardId: progress.flashcardId,
                        status: progress.status,
                        timesReviewed: progress.timesReviewed,
                        lastReviewed: progress.lastReviewed,
                    })),
                },
            },
            include: {
                assignments: true,
                progresses: true,
            },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
};