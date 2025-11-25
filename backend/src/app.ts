import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Routers
import healthRouter from './modules/health/health.router';
import inspectionRouter from './modules/inspections/inspections.router';

export function createApp() {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use('/uploads', express.static('uploads')); // Serve uploaded files
    app.use(requestLogger);

    // Routes
    app.get('/', (req, res) => {
        res.json({
            name: 'HydraAI-Inspect Backend',
            version: '1.0.0',
            status: 'running',
        });
    });

    app.use('/health', healthRouter);
    app.use('/api/inspections', inspectionRouter);

    // Error handling
    app.use(notFound);
    app.use(errorHandler);

    return app;
}
