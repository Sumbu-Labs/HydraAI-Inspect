import { Router, Request, Response } from 'express';
import { prisma } from '../../db';
import { aiService } from '../ai/ai.service';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        // Check database connection
        await prisma.$queryRaw`SELECT 1`;
        const dbStatus = 'connected';

        // Check AI service
        const aiHealthCheck = await aiService.healthCheck();
        const aiStatus = aiHealthCheck.status === 'ok' && aiHealthCheck.modelLoaded
            ? 'connected'
            : 'disconnected';

        const allHealthy = dbStatus === 'connected' && aiStatus === 'connected';

        res.status(allHealthy ? 200 : 503).json({
            status: allHealthy ? 'healthy' : 'degraded',
            timestamp: new Date().toISOString(),
            services: {
                database: dbStatus,
                aiService: aiStatus,
                aiModelLoaded: aiHealthCheck.modelLoaded,
            },
        });
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            services: {
                database: 'disconnected',
                aiService: 'unknown',
                aiModelLoaded: false,
            },
        });
    }
});

export default router;
