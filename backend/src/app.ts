import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Routers
import healthRouter from './modules/health/health.router.js';
import inspectionRouter from './modules/inspections/inspections.router.js';

export function createApp() {
    const app = express();

    // Middleware
    app.use(cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://hydra-ai.sumbu.xyz',
            'https://ai-service.hydra-ai.sumbu.xyz',
            'https://app.hydra-ai.sumbu.xyz',
        ],
        credentials: true,
    }));
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
