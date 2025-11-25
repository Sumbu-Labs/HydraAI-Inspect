# Backend Deployment Summary

## ✅ Changes Made

### 1. **package.json** Updates
- Added `prebuild` script to auto-generate Prisma client
- Fixed `start` script to run `dist/server.js`
- Added `db:deploy` for production migrations

### 2. **CORS Configuration** (`src/app.ts`)
- Configured allowed origins:
  - `http://localhost:3000` (landing-page dev)
  - `http://localhost:3001` (frontend-app dev)
  - `https://hydra-ai.sumbu.xyz` (landing-page prod)
  - `https://app.hydra-ai.sumbu.xyz` (frontend-app prod)
- Enabled credentials support

### 3. **Environment Variables** (`src/config/env.ts`)
- Added `BASE_URL` for dynamic image URL generation
- Default: `http://localhost:4000`
- Production: `https://api.hydra-ai.sumbu.xyz`

### 4. **Image URL Generation** (`src/modules/inspections/inspections.service.ts`)
- Replaced hardcoded `localhost:${PORT}` with `BASE_URL` env variable
- Supports dynamic URL generation for uploaded files

### 5. **Deployment Files Created**
- `ecosystem.config.cjs` - PM2 configuration
- `DEPLOYMENT.md` - Full deployment guide
- `QUICK-DEPLOY.md` - Quick reference
- `logs/` directory for PM2 logs

## 🚀 Quick Deploy Commands

```bash
# 1. Setup environment
export NODE_ENV=production
export PORT=4000
export BASE_URL=https://api.hydra-ai.sumbu.xyz
export DATABASE_URL="your_neon_postgres_url"
export AI_SERVICE_URL=http://localhost:8000

# 2. Install & Build
npm install
npm run build

# 3. Deploy database
npm run db:deploy

# 4. Start with PM2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

## 📋 Production Checklist

- [ ] Set all environment variables in `.env`
- [ ] Run database migrations (`npm run db:deploy`)
- [ ] Build application (`npm run build`)
- [ ] Configure Nginx reverse proxy
- [ ] Install SSL certificate
- [ ] Start with PM2
- [ ] Verify CORS origins
- [ ] Test API endpoints

## 🔗 Related Files

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full guide
- [QUICK-DEPLOY.md](./QUICK-DEPLOY.md) - Quick reference
- [ecosystem.config.cjs](./ecosystem.config.cjs) - PM2 config
- [.env.example](./.env.example) - Environment template
