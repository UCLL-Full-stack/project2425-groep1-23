import { ApiError } from './ApiError';

export class BadRequestError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 400, details);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
