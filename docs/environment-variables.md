# Environment Variables Reference

Quick reference untuk semua environment variables yang dibutuhkan oleh setiap service.

## 🔧 Backend API

**File:** `backend/.env`

```env
# Server Configuration
NODE_ENV=development                    # development | production | test
PORT=4000                               # Port untuk backend API

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/hydraai_inspect

# External Services
AI_SERVICE_URL=http://localhost:8000    # URL ke AI Service
STORAGE_BASE_URL=                       # Optional: IPFS/Backblaze B2 URL
HYDRA_RPC_URL=                          # Optional: Hydra Head RPC URL
```

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `AI_SERVICE_URL` - URL ke AI Service (default: http://localhost:8000)

**Optional:**
- `NODE_ENV` - Default: development
- `PORT` - Default: 4000
- `STORAGE_BASE_URL` - Untuk IPFS/cloud storage
- `HYDRA_RPC_URL` - Untuk Hydra Layer 2

---

## 🤖 AI Service

**File:** `ai-service/.env`

```env
# Model Configuration
YOLO_MODEL_PATH=./models/car_damage_yolo.pt
CONFIDENCE_THRESHOLD=0.4
MAX_IMAGES_PER_REQUEST=6

# Server Configuration
CORS_ORIGINS=*
LOG_LEVEL=INFO                          # DEBUG | INFO | WARNING | ERROR
```

**Required:**
- `YOLO_MODEL_PATH` - Path ke YOLO model file (.pt)

**Optional:**
- `CONFIDENCE_THRESHOLD` - Default: 0.4 (40%)
- `MAX_IMAGES_PER_REQUEST` - Default: 6
- `CORS_ORIGINS` - Default: * (allow all)
- `LOG_LEVEL` - Default: INFO

---

## 🎨 Frontend App

**File:** `frontend-app/.env`

```env
# Optional: Gemini API for AI features
GEMINI_API_KEY=your_gemini_api_key_here
```

**Optional:**
- `GEMINI_API_KEY` - Untuk fitur AI tambahan (jika ada)

**Note:** Frontend app menggunakan hardcoded `http://localhost:4000` untuk backend API URL. Jika perlu mengubah, edit di source code.

---

## 🌐 Landing Page

**File:** `landing-page/.env`

```env
# Optional: Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
```

**Optional:**
- `GEMINI_API_KEY` - Untuk fitur AI tambahan (jika ada)

---

## 📋 Setup Checklist

### 1. Backend Setup
```bash
cd backend
cat > .env << 'EOF'
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://hydraai:password@localhost:5432/hydraai_inspect
AI_SERVICE_URL=http://localhost:8000
STORAGE_BASE_URL=
HYDRA_RPC_URL=
EOF
```

### 2. AI Service Setup
```bash
cd ai-service
cat > .env << 'EOF'
YOLO_MODEL_PATH=./models/car_damage_yolo.pt
MAX_IMAGES_PER_REQUEST=6
CONFIDENCE_THRESHOLD=0.4
CORS_ORIGINS=*
LOG_LEVEL=INFO
EOF
```

### 3. Frontend App Setup (Optional)
```bash
cd frontend-app
cat > .env << 'EOF'
GEMINI_API_KEY=
EOF
```

### 4. Landing Page Setup (Optional)
```bash
cd landing-page
cat > .env << 'EOF'
GEMINI_API_KEY=
EOF
```

---

## 🔐 Security Notes

### Development
- Gunakan `CORS_ORIGINS=*` untuk development
- Database password bisa simple

### Production
- **JANGAN** commit file `.env` ke git
- Gunakan strong password untuk database
- Set `CORS_ORIGINS` ke domain spesifik
- Set `NODE_ENV=production`
- Gunakan HTTPS untuk semua URL

---

## 🔗 Service Dependencies

```
Frontend App ──→ Backend API ──┬──→ AI Service
                               ├──→ PostgreSQL
                               └──→ Hydra (optional)
```

**Urutan Start:**
1. PostgreSQL (harus running terlebih dahulu)
2. AI Service (port 8000)
3. Backend API (port 4000) - butuh AI Service & PostgreSQL
4. Frontend App (port 3001) - butuh Backend API
5. Landing Page (port 3000) - standalone

---

## 🧪 Testing Environment Variables

### Test Backend Connection
```bash
# Di folder backend
pnpm dev

# Jika error "Invalid environment variables", cek .env
# Pastikan DATABASE_URL dan AI_SERVICE_URL valid
```

### Test AI Service
```bash
# Di folder ai-service
source yolo_env/bin/activate
uvicorn app.main:app --reload --port 8000

# Cek health endpoint
curl http://localhost:8000/health
```

### Test Database Connection
```bash
# Test PostgreSQL connection
psql -U hydraai -d hydraai_inspect -c "SELECT 1;"

# Atau gunakan DATABASE_URL langsung
psql "postgresql://hydraai:password@localhost:5432/hydraai_inspect" -c "SELECT 1;"
```

---

## 📝 Common Issues

### Backend: "Invalid environment variables"
**Cause:** Missing or invalid DATABASE_URL or AI_SERVICE_URL

**Fix:**
```bash
# Cek format DATABASE_URL
# Harus: postgresql://user:password@host:port/database
# Contoh: postgresql://hydraai:mypass123@localhost:5432/hydraai_inspect

# Cek AI_SERVICE_URL
# Harus: http://localhost:8000 (atau URL valid lainnya)
```

### AI Service: "Failed to load YOLO model"
**Cause:** Model file tidak ditemukan di path yang ditentukan

**Fix:**
```bash
# Cek apakah model file ada
ls -lh ai-service/models/car_damage_yolo.pt

# Jika tidak ada, download atau copy model ke folder tersebut
# Atau update YOLO_MODEL_PATH di .env
```

### Frontend: "Network Error"
**Cause:** Backend tidak running atau CORS issue

**Fix:**
```bash
# Pastikan backend running
curl http://localhost:4000/health

# Cek CORS_ORIGINS di backend jika perlu
```

---

## 🎯 Quick Commands

```bash
# Create all .env files at once
./scripts/setup-env.sh

# Start all services
./start-all.sh

# Stop all services
./stop-all.sh

# Check all services status
./scripts/check-services.sh
```
