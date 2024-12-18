export class AuthorizationError extends Error {
    constructor(message: string = 'Unauthorized access') {
        super(message);
        this.name = 'AuthorizationError';
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }
}

export class ValidationError extends Error {
    constructor(message: string = 'Validation failed') {
        super(message);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
