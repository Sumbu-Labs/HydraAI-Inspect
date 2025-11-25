# Backend - HydraAI-Inspect

Backend API untuk HydraAI-Inspect, sistem inspeksi kendaraan berbasis AI dengan integrasi Hydra L2 blockchain.

## 🚀 Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Validation**: Zod
- **AI Integration**: Python YOLO + FastAPI

## 📋 Prerequisites

- Node.js >= 18
- pnpm (recommended) atau npm
- PostgreSQL database (Neon account)
- AI Service running (ai-service)

## 🛠️ Installation

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Edit .env dengan DATABASE_URL dari Neon
nano .env

# Generate Prisma Client
pnpm db:generate

# Run migrations
pnpm db:migrate
```

## 🔧 Environment Variables

Buat file `.env` di root folder `backend/` dengan isi:

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
AI_SERVICE_URL=http://ai-service:8000
STORAGE_BASE_URL=https://your-storage.com
HYDRA_RPC_URL=https://hydra-rpc.io
```

### Environment Variables Wajib:

- `DATABASE_URL` - Connection string PostgreSQL dari Neon
- `AI_SERVICE_URL` - URL ke Python YOLO service

### Environment Variables Opsional:

- `NODE_ENV` - development | production | test (default: development)
- `PORT` - Port server (default: 4000)
- `STORAGE_BASE_URL` - Base URL untuk storage gambar
- `HYDRA_RPC_URL` - RPC URL Hydra L2 network

## 🏃 Development

```bash
# Run development server dengan hot reload
pnpm dev

# Build untuk production
pnpm build

# Run production build
pnpm start

# Open Prisma Studio (database GUI)
pnpm db:studio
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Cek status database & AI service

### Inspections
- `POST /api/inspections` - Buat inspection baru
- `POST /api/inspections/:id/images` - Upload gambar ke inspection
- `POST /api/inspections/:id/analyze` - Analisis dengan AI
- `GET /api/inspections/:id` - Get detail inspection
- `GET /api/inspections` - List semua inspections (dengan pagination)

### Example Request

**Create Inspection:**
```bash
curl -X POST http://localhost:4000/api/inspections \
  -H "Content-Type: application/json" \
  -d '{
    "plate": "B1234XYZ",
    "vin": "1HGBH41JXMN109186",
    "vehicleLabel": "Toyota Avanza"
  }'
```

**Add Images:**
```bash
curl -X POST http://localhost:4000/api/inspections/{id}/images \
  -H "Content-Type: application/json" \
  -d '{
    "images": [
      {"url": "https://storage.com/img1.jpg", "orderIndex": 0},
      {"url": "https://storage.com/img2.jpg", "orderIndex": 1}
    ]
  }'
```

**Analyze:**
```bash
curl -X POST http://localhost:4000/api/inspections/{id}/analyze
```

## 🗄️ Database

### Prisma Commands

```bash
# Generate Prisma Client setelah ubah schema
pnpm db:generate

# Create migration
pnpm db:migrate

# Push schema tanpa migration (dev only)
pnpm db:push

# Open Prisma Studio
pnpm db:studio
```

### Database Schema

- `Inspection` - Data inspeksi kendaraan
- `InspectionImage` - Gambar-gambar inspeksi
- `InspectionDamage` - Damage yang terdeteksi AI
- `VctToken` - Token VCT yang di-mint di Hydra

## 🏗️ Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Prisma schema
├── src/
│   ├── app.ts                 # Express app factory
│   ├── server.ts              # HTTP server entry
│   ├── index.ts               # Main entry point
│   ├── config/
│   │   └── env.ts             # Environment validation
│   ├── db/
│   │   └── index.ts           # Prisma client
│   ├── middleware/
│   │   ├── errorHandler.ts   # Global error handler
│   │   ├── notFound.ts        # 404 handler
│   │   └── requestLogger.ts  # Request logger
│   ├── modules/
│   │   ├── ai/
│   │   │   └── ai.service.ts # AI service client
│   │   ├── health/
│   │   │   └── health.router.ts
│   │   └── inspections/
│   │       ├── inspections.router.ts
│   │       ├── inspections.controller.ts
│   │       ├── inspections.service.ts
│   │       └── inspections.model.ts
│   └── types/
│       └── express.d.ts       # Custom types
├── .env                       # Environment variables (gitignored)
├── .env.example               # Environment template
├── package.json
└── tsconfig.json
```

## 🐳 Docker

Backend ini akan di-run via docker-compose di root monorepo.

```bash
# Dari root monorepo
docker-compose up backend
```

## 🔍 Troubleshooting

### Database Connection Error
- Pastikan `DATABASE_URL` di `.env` benar
- Cek Neon dashboard untuk connection string
- Pastikan IP allowlist di Neon sudah di-set

### AI Service Connection Error
- Pastikan `ai-service` sudah running
- Cek `AI_SERVICE_URL` di `.env`
- Test dengan `curl http://ai-service:8000/health`

### Prisma Generate Error
```bash
# Clear Prisma cache
rm -rf node_modules/.prisma
pnpm db:generate
```

## 📝 Notes

- Gunakan `pnpm` untuk konsistensi dengan monorepo
- Semua endpoint menggunakan prefix `/api` kecuali `/health`
- Error responses selalu dalam format: `{ status: "error", message: "..." }`
- Success responses dalam format: `{ status: "success", data: {...} }`
