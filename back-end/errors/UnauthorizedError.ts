import { ApiError } from './ApiError';

export class UnauthorizedError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 401, details);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
