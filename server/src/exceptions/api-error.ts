export class ApiError extends Error {
    status;
    errors;
    constructor(status: number, message: string, errors: unknown[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Unauthorized user');
    }

    static BadRequest(message: string, errors: unknown[] = []) {
        return new ApiError(400, message, errors);
    }
}
