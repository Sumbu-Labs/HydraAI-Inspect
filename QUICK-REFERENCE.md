# HydraAI-Inspect Quick Reference Card

## 🚀 Quick Start Commands

### First Time Setup
```bash
# 1. Setup environment
./scripts/setup-env.sh

# 2. Install all dependencies
pnpm install

# 3. Setup database
cd backend && pnpm db:generate && pnpm db:migrate && cd ..
```

### Daily Development
```bash
# Start all services
./start-all.sh

# Check status
./scripts/check-services.sh

# Stop all services
./stop-all.sh
```

---

## 📍 Service Ports

| Service | Port | URL |
|---------|------|-----|
| Landing Page | 3000 | http://localhost:3000 |
| Frontend App | 3001 | http://localhost:3001 |
| Backend API | 4000 | http://localhost:4000 |
| AI Service | 8000 | http://localhost:8000 |
| AI Docs | 8000 | http://localhost:8000/docs |
| PostgreSQL | 5432 | localhost:5432 |

---

## 🔧 Manual Service Start

### Backend
```bash
cd backend
pnpm dev
```

### AI Service
```bash
cd ai-service
source yolo_env/bin/activate
uvicorn app.main:app --reload --port 8000
```

### Frontend App
```bash
cd frontend-app
pnpm dev
```

### Landing Page
```bash
cd landing-page
pnpm dev
```

---

## 🔍 Health Checks

```bash
# Backend
curl http://localhost:4000/health

# AI Service
curl http://localhost:8000/health

# Check all ports
lsof -i :3000,3001,4000,8000
```

---

## 🗄️ Database Commands

```bash
# Generate Prisma client
cd backend && pnpm db:generate

# Run migrations
cd backend && pnpm db:migrate

# Open Prisma Studio
cd backend && pnpm db:studio

# Push schema without migration
cd backend && pnpm db:push

# Direct PostgreSQL access
psql -U hydraai -d hydraai_inspect
```

---

## 📝 Environment Files

### backend/.env
```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://user:pass@localhost:5432/hydraai_inspect
AI_SERVICE_URL=http://localhost:8000
```

### ai-service/.env
```env
YOLO_MODEL_PATH=./models/car_damage_yolo.pt
CONFIDENCE_THRESHOLD=0.4
MAX_IMAGES_PER_REQUEST=6
CORS_ORIGINS=*
LOG_LEVEL=INFO
```

---

## 🐛 Common Issues

### Port Already in Use
```bash
# Find process using port
lsof -i :4000

# Kill process
kill -9 <PID>
```

### Database Connection Failed
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Test connection
psql -U postgres -c "SELECT 1;"
```

### AI Service Model Not Found
```bash
# Check model file
ls -lh ai-service/models/car_damage_yolo.pt

# Update path in .env if needed
```

### Backend Migration Error
```bash
# Reset database (CAUTION: deletes all data)
cd backend
pnpm db:push --force-reset

# Or manually drop and recreate
psql -U postgres -c "DROP DATABASE hydraai_inspect;"
psql -U postgres -c "CREATE DATABASE hydraai_inspect;"
pnpm db:migrate
```

---

## 🔄 Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "feat: your message"

# Push
git push origin main

# Pull latest
git pull origin main
```

---

## 📦 Package Management

```bash
# Install all workspaces
pnpm install

# Install in specific workspace
pnpm --filter backend add axios

# Update dependencies
pnpm update

# Clean node_modules
pnpm clean
```

---

## 🧪 Testing

```bash
# Backend tests (if available)
cd backend && pnpm test

# AI Service tests
cd ai-service && pytest

# E2E tests (if available)
pnpm test:e2e
```

---

## 📚 Documentation Links

- [Running Without Docker](docs/running-without-docker.md)
- [Environment Variables](docs/environment-variables.md)
- [Architecture Overview](docs/overview.md)
- [API Documentation](http://localhost:8000/docs) (when running)

---

## 🆘 Getting Help

1. Check logs in each terminal window
2. Run `./scripts/check-services.sh`
3. Review [docs/running-without-docker.md](docs/running-without-docker.md)
4. Check environment variables in `.env` files
5. Verify PostgreSQL is running
6. Ensure YOLO model file exists

---

## 🎯 Production Deployment

```bash
# Build all services
cd backend && pnpm build
cd frontend-app && pnpm build
cd landing-page && pnpm build

# Set production environment
export NODE_ENV=production

# Use Docker Compose for production
docker compose -f infra/docker-compose.prod.yml up -d
```

---

**Last Updated:** 2025-11-22
**Version:** 1.0.0
