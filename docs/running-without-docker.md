# Menjalankan HydraAI-Inspect Tanpa Docker Compose

Panduan ini menjelaskan cara menjalankan semua service HydraAI-Inspect secara manual tanpa menggunakan Docker Compose. Setiap service akan berjalan di terminal terpisah dan saling terhubung.

## 📋 Prerequisites

Pastikan Anda sudah menginstall:
- **Node.js** v18+ dan **pnpm**
- **Python** 3.10+
- **PostgreSQL** (running di localhost atau remote)

## 🗂️ Struktur Proyek & Port

| Service | Port | Teknologi | Deskripsi |
|---------|------|-----------|-----------|
| **Landing Page** | 3000 | React + Vite | Website landing page |
| **Frontend App** | 3001 | React + Vite | Aplikasi inspeksi utama |
| **Backend API** | 4000 | Node.js + Express | REST API server |
| **AI Service** | 8000 | Python + FastAPI | YOLO damage detection |
| **PostgreSQL** | 5432 | Database | Data persistence |

## 🚀 Langkah-langkah Setup

### 1️⃣ Setup Database (PostgreSQL)

Pastikan PostgreSQL sudah running. Jika belum:

```bash
# Ubuntu/Debian
sudo systemctl start postgresql
sudo systemctl enable postgresql

# macOS (dengan Homebrew)
brew services start postgresql@14

# Atau jalankan manual
postgres -D /usr/local/var/postgres
```

**Buat database untuk proyek:**

```bash
# Login ke PostgreSQL
psql -U postgres

# Di dalam psql console
CREATE DATABASE hydraai_inspect;
CREATE USER hydraai WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE hydraai_inspect TO hydraai;
\q
```

---

### 2️⃣ Setup Backend API (Port 4000)

**Terminal 1: Backend**

```bash
# Masuk ke folder backend
cd /home/maul/Kerjaan/Sumbu-Labs/HydraAI-Inspect/backend

# Install dependencies (jika belum)
pnpm install

# Buat file .env
cat > .env << 'EOF'
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://hydraai:your_password@localhost:5432/hydraai_inspect
AI_SERVICE_URL=http://localhost:8000
STORAGE_BASE_URL=
HYDRA_RPC_URL=
EOF

# Generate Prisma client
pnpm db:generate

# Jalankan migrasi database
pnpm db:migrate

# Jalankan backend dalam mode development
pnpm dev
```

**Verifikasi:**
- Backend akan running di `http://localhost:4000`
- Cek dengan: `curl http://localhost:4000/health`

---

### 3️⃣ Setup AI Service (Port 8000)

**Terminal 2: AI Service**

```bash
# Masuk ke folder ai-service
cd /home/maul/Kerjaan/Sumbu-Labs/HydraAI-Inspect/ai-service

# Buat virtual environment (jika belum ada)
python3 -m venv yolo_env

# Aktifkan virtual environment
source yolo_env/bin/activate

# Install dependencies
pip install .

# Buat file .env (jika belum ada)
cat > .env << 'EOF'
YOLO_MODEL_PATH=./models/car_damage_yolo.pt
MAX_IMAGES_PER_REQUEST=6
CONFIDENCE_THRESHOLD=0.4
CORS_ORIGINS=*
LOG_LEVEL=INFO
EOF

# Pastikan model YOLO ada di folder models/
# Jika belum ada, download atau copy model ke:
# ./models/car_damage_yolo.pt

# Jalankan AI service
uvicorn app.main:app --reload --port 8000 --host 0.0.0.0
```

**Verifikasi:**
- AI Service akan running di `http://localhost:8000`
- Cek dengan: `curl http://localhost:8000/health`
- Buka dokumentasi API: `http://localhost:8000/docs`

---

### 4️⃣ Setup Frontend App (Port 3001)

**Terminal 3: Frontend App**

```bash
# Masuk ke folder frontend-app
cd /home/maul/Kerjaan/Sumbu-Labs/HydraAI-Inspect/frontend-app

# Install dependencies (jika belum)
pnpm install

# Buat file .env (optional, untuk Gemini API)
cat > .env << 'EOF'
GEMINI_API_KEY=your_gemini_api_key_here
EOF

# Jalankan frontend app
pnpm dev
```

**Verifikasi:**
- Frontend App akan running di `http://localhost:3001`
- Buka di browser: `http://localhost:3001`

---

### 5️⃣ Setup Landing Page (Port 3000)

**Terminal 4: Landing Page**

```bash
# Masuk ke folder landing-page
cd /home/maul/Kerjaan/Sumbu-Labs/HydraAI-Inspect/landing-page

# Install dependencies (jika belum)
pnpm install

# Jalankan landing page
pnpm dev
```

**Verifikasi:**
- Landing Page akan running di `http://localhost:3000`
- Buka di browser: `http://localhost:3000`

---

## 🔗 Koneksi Antar Service

Berikut adalah bagaimana service-service saling terhubung:

```
┌─────────────────┐
│  Landing Page   │  :3000
│   (React)       │
└────────┬────────┘
         │ Navigate to
         ↓
┌─────────────────┐      ┌─────────────────┐
│  Frontend App   │ ───→ │   Backend API   │  :4000
│   (React)       │ :3001│  (Node.js)      │
└─────────────────┘      └────────┬────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ↓             ↓             ↓
            ┌───────────┐  ┌──────────┐  ┌──────────┐
            │AI Service │  │PostgreSQL│  │  Hydra   │
            │  (YOLO)   │  │ Database │  │  (L2)    │
            │   :8000   │  │  :5432   │  │          │
            └───────────┘  └──────────┘  └──────────┘
```

### Konfigurasi Koneksi:

1. **Frontend App → Backend API**
   - Frontend mengakses backend di `http://localhost:4000`
   - Konfigurasi ada di file frontend (axios baseURL)

2. **Backend API → AI Service**
   - Backend memanggil AI Service di `http://localhost:8000`
   - Konfigurasi: `AI_SERVICE_URL` di backend `.env`

3. **Backend API → PostgreSQL**
   - Backend terhubung ke database via `DATABASE_URL`
   - Format: `postgresql://user:password@localhost:5432/dbname`

4. **Landing Page → Frontend App**
   - Button "Launch App" mengarah ke `http://localhost:3001`

---

## ✅ Verifikasi Semua Service Running

Jalankan command berikut untuk cek semua service:

```bash
# Cek Backend
curl http://localhost:4000/health

# Cek AI Service
curl http://localhost:8000/health

# Cek Frontend App (di browser)
open http://localhost:3001

# Cek Landing Page (di browser)
open http://localhost:3000

# Cek Database Connection
psql -U hydraai -d hydraai_inspect -c "SELECT 1;"
```

---

## 🐛 Troubleshooting

### Backend tidak bisa connect ke database

**Error:** `Invalid environment variables: DATABASE_URL`

**Solusi:**
```bash
# Pastikan PostgreSQL running
sudo systemctl status postgresql

# Cek koneksi manual
psql -U hydraai -d hydraai_inspect

# Update DATABASE_URL di backend/.env dengan credentials yang benar
```

### AI Service error "Model not found"

**Error:** `Failed to load YOLO model`

**Solusi:**
```bash
# Pastikan model file ada
ls -lh ai-service/models/car_damage_yolo.pt

# Jika tidak ada, download atau copy model YOLO Anda ke folder tersebut
# Atau update YOLO_MODEL_PATH di ai-service/.env
```

### Frontend tidak bisa connect ke Backend

**Error:** `Network Error` atau `CORS Error`

**Solusi:**
1. Pastikan backend running di port 4000
2. Cek CORS settings di backend
3. Periksa axios baseURL di frontend:
   ```typescript
   // frontend-app/src/api/client.ts atau similar
   const API_URL = 'http://localhost:4000';
   ```

### Port sudah digunakan

**Error:** `EADDRINUSE: address already in use :::4000`

**Solusi:**
```bash
# Cari process yang menggunakan port
lsof -i :4000

# Kill process tersebut
kill -9 <PID>

# Atau gunakan port lain dengan mengubah .env
```

---

## 📝 Environment Variables Lengkap

### Backend (.env)
```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://hydraai:your_password@localhost:5432/hydraai_inspect
AI_SERVICE_URL=http://localhost:8000
STORAGE_BASE_URL=
HYDRA_RPC_URL=
```

### AI Service (.env)
```env
YOLO_MODEL_PATH=./models/car_damage_yolo.pt
MAX_IMAGES_PER_REQUEST=6
CONFIDENCE_THRESHOLD=0.4
CORS_ORIGINS=*
LOG_LEVEL=INFO
```

### Frontend App (.env) - Optional
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🔄 Menghentikan Semua Service

Untuk menghentikan semua service, tekan `Ctrl+C` di setiap terminal yang menjalankan service.

Atau gunakan script helper:

```bash
# Kill semua process berdasarkan port
pkill -f "vite"          # Kill frontend & landing page
pkill -f "tsx watch"     # Kill backend
pkill -f "uvicorn"       # Kill AI service
```

---

## 📚 Next Steps

Setelah semua service running:

1. Buka `http://localhost:3000` untuk melihat landing page
2. Klik "Launch App" untuk masuk ke aplikasi di `http://localhost:3001`
3. Upload gambar kendaraan untuk testing AI detection
4. Cek database untuk melihat data yang tersimpan:
   ```bash
   pnpm --filter backend db:studio
   ```

---

## 🎯 Tips Development

1. **Hot Reload**: Semua service sudah menggunakan hot reload, jadi perubahan code akan langsung terdeteksi
2. **Logs**: Perhatikan logs di setiap terminal untuk debugging
3. **Database GUI**: Gunakan `pnpm db:studio` di folder backend untuk GUI database
4. **API Docs**: AI Service punya Swagger UI di `http://localhost:8000/docs`

---

Selamat coding! 🚀
