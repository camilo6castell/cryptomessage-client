import { ApiError } from './ApiError'

export class ConflictError extends ApiError {
    constructor(data?: unknown) {
        super(409, 'Conflict', data);
    }
}