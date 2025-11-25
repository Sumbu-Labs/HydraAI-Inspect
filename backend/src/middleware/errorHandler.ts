import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperational = true
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    // Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        return res.status(400).json({
            status: 'error',
            message: 'Database operation failed',
        });
    }

    // Log unexpected errors
    console.error('❌ Unexpected error:', err);

    // Don't leak error details in production
    const message = env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message;

    return res.status(500).json({
        status: 'error',
        message,
    });
};
