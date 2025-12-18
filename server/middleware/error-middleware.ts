import { ApiError } from '../src/exceptions/api-error';

export function errorMiddleware(error, req, res, next) {
    console.log(error);
    if (error instanceof ApiError) {
        return res.status(error.status).json({
            message: error.message,
            error: error.errors
        })
    }
    return res.status(500).json({
        message: 'Unexpected error',
    })
}