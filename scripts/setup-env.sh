#!/bin/bash

# HydraAI-Inspect - Environment Setup Script
# This script helps you set up all required .env files

set -e

PROJECT_ROOT="/home/maul/Kerjaan/Sumbu-Labs/HydraAI-Inspect"

echo "🔧 HydraAI-Inspect Environment Setup"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to prompt for input with default value
prompt_with_default() {
    local prompt=$1
    local default=$2
    local var_name=$3
    
    read -p "$prompt [$default]: " input
    eval "$var_name=\"${input:-$default}\""
}

# Function to create .env file
create_env_file() {
    local file=$1
    local content=$2
    
    if [ -f "$file" ]; then
        echo -e "${YELLOW}⚠️  $file already exists${NC}"
        read -p "Overwrite? (y/N): " overwrite
        if [[ ! $overwrite =~ ^[Yy]$ ]]; then
            echo "Skipping $file"
            return
        fi
    fi
    
    echo "$content" > "$file"
    echo -e "${GREEN}✅ Created $file${NC}"
}

echo "This script will help you create .env files for all services."
echo ""

# ============================================
# 1. Backend Configuration
# ============================================
echo "1️⃣  Backend API Configuration"
echo "-------------------------------------------"

prompt_with_default "Backend Port" "4000" BACKEND_PORT
prompt_with_default "Database User" "hydraai" DB_USER
prompt_with_default "Database Password" "hydraai123" DB_PASSWORD
prompt_with_default "Database Name" "hydraai_inspect" DB_NAME
prompt_with_default "Database Host" "localhost" DB_HOST
prompt_with_default "Database Port" "5432" DB_PORT
prompt_with_default "AI Service URL" "http://localhost:8000" AI_SERVICE_URL

DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

BACKEND_ENV="NODE_ENV=development
PORT=${BACKEND_PORT}
DATABASE_URL=${DATABASE_URL}
AI_SERVICE_URL=${AI_SERVICE_URL}
STORAGE_BASE_URL=
HYDRA_RPC_URL="

create_env_file "$PROJECT_ROOT/backend/.env" "$BACKEND_ENV"
echo ""

# ============================================
# 2. AI Service Configuration
# ============================================
echo "2️⃣  AI Service Configuration"
echo "-------------------------------------------"

prompt_with_default "YOLO Model Path" "./models/car_damage_yolo.pt" YOLO_MODEL_PATH
prompt_with_default "Confidence Threshold" "0.4" CONFIDENCE_THRESHOLD
prompt_with_default "Max Images Per Request" "6" MAX_IMAGES
prompt_with_default "CORS Origins" "*" CORS_ORIGINS
prompt_with_default "Log Level" "INFO" LOG_LEVEL

AI_ENV="YOLO_MODEL_PATH=${YOLO_MODEL_PATH}
MAX_IMAGES_PER_REQUEST=${MAX_IMAGES}
CONFIDENCE_THRESHOLD=${CONFIDENCE_THRESHOLD}
CORS_ORIGINS=${CORS_ORIGINS}
LOG_LEVEL=${LOG_LEVEL}"

create_env_file "$PROJECT_ROOT/ai-service/.env" "$AI_ENV"
echo ""

# ============================================
# 3. Frontend App Configuration (Optional)
# ============================================
echo "3️⃣  Frontend App Configuration (Optional)"
echo "-------------------------------------------"

read -p "Do you have a Gemini API Key? (y/N): " has_gemini
if [[ $has_gemini =~ ^[Yy]$ ]]; then
    prompt_with_default "Gemini API Key" "" GEMINI_API_KEY
    FRONTEND_ENV="GEMINI_API_KEY=${GEMINI_API_KEY}"
else
    FRONTEND_ENV="GEMINI_API_KEY="
fi

create_env_file "$PROJECT_ROOT/frontend-app/.env" "$FRONTEND_ENV"
echo ""

# ============================================
# 4. Landing Page Configuration (Optional)
# ============================================
echo "4️⃣  Landing Page Configuration (Optional)"
echo "-------------------------------------------"

if [[ $has_gemini =~ ^[Yy]$ ]]; then
    LANDING_ENV="GEMINI_API_KEY=${GEMINI_API_KEY}"
else
    LANDING_ENV="GEMINI_API_KEY="
fi

create_env_file "$PROJECT_ROOT/landing-page/.env" "$LANDING_ENV"
echo ""

# ============================================
# Summary
# ============================================
echo "================================================"
echo -e "${GREEN}✅ Environment setup complete!${NC}"
echo ""
echo "📋 Summary:"
echo "   Backend Port:     ${BACKEND_PORT}"
echo "   Database URL:     ${DATABASE_URL}"
echo "   AI Service URL:   ${AI_SERVICE_URL}"
echo "   YOLO Model Path:  ${YOLO_MODEL_PATH}"
echo ""
echo "🔍 Next Steps:"
echo "   1. Make sure PostgreSQL is running"
echo "   2. Create the database:"
echo "      psql -U postgres -c \"CREATE DATABASE ${DB_NAME};\""
echo "      psql -U postgres -c \"CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';\""
echo "      psql -U postgres -c \"GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};\""
echo ""
echo "   3. Make sure YOLO model file exists at:"
echo "      ${PROJECT_ROOT}/ai-service/${YOLO_MODEL_PATH}"
echo ""
echo "   4. Install dependencies and run migrations:"
echo "      cd backend && pnpm install && pnpm db:generate && pnpm db:migrate"
echo ""
echo "   5. Start all services:"
echo "      ./start-all.sh"
echo ""
