import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    if (env.NODE_ENV === 'development') {
        const start = Date.now();

        res.on('finish', () => {
            const duration = Date.now() - start;
            const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
            const reset = '\x1b[0m';

            console.log(
                `${statusColor}${req.method}${reset} ${req.path} ${statusColor}${res.statusCode}${reset} - ${duration}ms`
            );
        });
    }

    next();
};
