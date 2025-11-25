# Backend Quick Deployment

## 🚀 Quick Start (Production)

```bash
# 1. Setup environment
cp .env.example .env
# Edit .env with production values

# 2. Install & Build
npm install
npm run build

# 3. Database
npm run db:deploy

# 4. Start with PM2
pm2 start ecosystem.config.cjs
pm2 save
```

## 📝 Required Environment Variables

```env
NODE_ENV=production
PORT=4000
BASE_URL=https://api.hydra-ai.sumbu.xyz
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
AI_SERVICE_URL=http://localhost:8000
```

## 🔄 Update

```bash
git pull
npm install
npm run build
pm2 reload hydra-backend
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full guide.
