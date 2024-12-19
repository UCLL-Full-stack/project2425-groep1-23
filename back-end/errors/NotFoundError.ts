import { ApiError } from './ApiError';

export class NotFoundError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 404, details);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
