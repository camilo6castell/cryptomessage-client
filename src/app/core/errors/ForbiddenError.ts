import { ApiError } from './ApiError';

export class ForbiddenError extends ApiError {
  constructor(data?: unknown) {
    super(403, 'Forbidden', data);
  }
}
