import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { AuthorizationError } from '../errors';
import { isTokenInvalidated } from '../service/userService';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Middleware to authorize users based on their roles.
 * @param allowedRoles - Array of roles that are allowed to access the route.
 */
export const authorizeRole = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const token = authHeader.split(' ')[1];

      console.log('Token received in middleware:', token);
  
      if (isTokenInvalidated(token)) {
        console.warn('Token has been invalidated:', token);
        return res.status(401).json({ error: 'Token has been invalidated' });
      }
      
  
      try {
        const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: Role };
  
        if (!allowedRoles.includes(payload.role)) {
          throw new AuthorizationError('Forbidden: Insufficient permissions');
        }
  
        (req as Request & { user?: { id: number; email: string; role: Role } }).user = {
          id: payload.id,
          email: payload.email,
          role: payload.role,
        };
  
        next();
      } catch (error: any) {
        if (error instanceof AuthorizationError) {
          return res.status(403).json({ error: error.message });
        }
        return res.status(401).json({ error: 'Invalid token' });
      }
    };
  };
