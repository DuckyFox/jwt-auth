import { ApiError } from '../exceptions/api-error';
import { Response, Request } from 'express';

export function errorMiddleware(error: unknown, req: Request, res: Response) {
    if (error instanceof ApiError) {
        return res.status(error.status).json({
            message: error.message,
            error: error.errors
        });
    }
    return res.status(500).json({
        message: 'Unexpected error'
    });
}
