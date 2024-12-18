import { Role } from '@prisma/client';
import 'express';

declare module 'express' {
    interface UserPayload {
        id: number;
        email: string;
        role: Role;
    }

    interface Request {
        user?: UserPayload;
    }
}
