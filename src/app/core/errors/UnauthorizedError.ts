import { ApiError } from './ApiError'

export class UnauthorizedError extends ApiError {
    constructor(data?: unknown) {
        super(401, 'Unauthorized', data);
    }
}