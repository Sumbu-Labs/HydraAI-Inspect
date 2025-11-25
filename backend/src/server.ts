import { createApp } from './app';
import { env } from './config/env';
import { prisma } from './db';

const app = createApp();

const server = app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
    console.log(`📝 Environment: ${env.NODE_ENV}`);
    console.log(`🗄️  Database: Connected to Neon`);
    console.log(`🤖 AI Service: ${env.AI_SERVICE_URL}`);
});

// Graceful shutdown
const shutdown = async () => {
    console.log('\n🛑 Shutting down gracefully...');

    server.close(async () => {
        await prisma.$disconnect();
        console.log('✅ Server closed');
        process.exit(0);
    });

    // Force shutdown after 10s
    setTimeout(() => {
        console.error('⚠️  Forced shutdown');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
