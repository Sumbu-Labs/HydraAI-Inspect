import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform(Number).pipe(z.number().positive()).default('4000'),
    DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection string'),
    AI_SERVICE_URL: z.string().url('AI_SERVICE_URL must be a valid URL').default('http://localhost:8000'),
    STORAGE_BASE_URL: z.string().url().optional().or(z.literal('')),
    HYDRA_RPC_URL: z.string().url().optional().or(z.literal('')),
});

function validateEnv() {
    try {
        return envSchema.parse(process.env);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Invalid environment variables:');
            error.errors.forEach((err) => {
                console.error(`  - ${err.path.join('.')}: ${err.message}`);
            });
            process.exit(1);
        }
        throw error;
    }
}

export const env = validateEnv();
