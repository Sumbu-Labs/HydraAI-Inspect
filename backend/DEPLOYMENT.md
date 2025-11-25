# Backend Deployment Guide

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon recommended)
- PM2 installed globally: `npm install -g pm2`

## 🔧 Environment Setup

### 1. Create Production Environment File

Create `.env` file with production values:

```bash
NODE_ENV=production
PORT=4000
BASE_URL=https://api.hydra-ai.sumbu.xyz
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
AI_SERVICE_URL=http://localhost:8000
```

### 2. Database Migration

```bash
# Generate Prisma Client
npm run db:generate

# Deploy migrations to production database
npm run db:deploy
```

## 🚀 Deployment Steps

### 1. Install Dependencies

```bash
npm install --production=false
```

### 2. Build the Application

```bash
npm run build
```

This will:
- Generate Prisma Client (via `prebuild` script)
- Compile TypeScript to JavaScript in `dist/` folder

### 3. Start with PM2

```bash
# Start the application
pm2 start ecosystem.config.cjs

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Alternative: Start without PM2

```bash
npm start
```

## 🌐 Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.hydra-ai.sumbu.xyz;

    # File upload size limit
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeout for long-running AI analysis
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Serve uploaded files directly
    location /uploads {
        alias /path/to/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### SSL Certificate

```bash
sudo certbot --nginx -d api.hydra-ai.sumbu.xyz
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `4000` |
| `BASE_URL` | API base URL for image URLs | `https://api.hydra-ai.sumbu.xyz` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `AI_SERVICE_URL` | AI service endpoint | `http://localhost:8000` |

## 🔄 Update Deployment

```bash
# Pull latest changes
git pull

# Install dependencies
npm install

# Build
npm run build

# Restart PM2
pm2 restart hydra-backend

# Or reload with zero-downtime
pm2 reload hydra-backend
```

## 📊 Monitoring

```bash
# View logs
pm2 logs hydra-backend

# Monitor resources
pm2 monit

# Check status
pm2 status
```

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test database connection
npm run db:studio
```

### Port Already in Use

```bash
lsof -i :4000
kill -9 <PID>
```

### Check Build Output

```bash
ls -la dist/
```

## 📦 Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations deployed
- [ ] Build completed successfully
- [ ] PM2 configured and running
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed
- [ ] CORS origins updated for production domains
- [ ] File upload directory has correct permissions
- [ ] Logs directory created (`mkdir -p logs`)
