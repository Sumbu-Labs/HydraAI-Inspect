import { createApp } from './app.js';
import { env } from './config/env.js';
import { prisma } from './db/index.js';

import fs from 'fs';
import path from 'path';

const app = createApp();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`📂 Created uploads directory at ${uploadsDir}`);
} else {
    console.log(`📂 Uploads directory exists at ${uploadsDir}`);
}

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
