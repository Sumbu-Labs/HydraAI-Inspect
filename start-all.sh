#!/bin/bash

# HydraAI-Inspect - Start All Services Script
# This script starts all services in separate terminal tabs/windows

set -e

PROJECT_ROOT="/home/maul/Kerjaan/Sumbu-Labs/HydraAI-Inspect"

echo "🚀 Starting HydraAI-Inspect Services..."
echo "================================================"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists pnpm; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

if ! command_exists python3; then
    echo "❌ Python 3 is not installed"
    exit 1
fi

if ! command_exists psql; then
    echo "⚠️  PostgreSQL client not found. Make sure PostgreSQL is installed."
fi

echo "✅ Prerequisites check passed"
echo ""

# Function to open new terminal and run command
run_in_terminal() {
    local title=$1
    local command=$2
    local dir=$3
    
    if command_exists gnome-terminal; then
        gnome-terminal --tab --title="$title" -- bash -c "cd '$dir' && $command; exec bash"
    elif command_exists konsole; then
        konsole --new-tab -e bash -c "cd '$dir' && $command; exec bash" &
    elif command_exists xterm; then
        xterm -T "$title" -e "cd '$dir' && $command; exec bash" &
    else
        echo "⚠️  No supported terminal emulator found. Please run manually:"
        echo "   cd $dir && $command"
    fi
}

# Start services
echo "🔧 Starting services in separate terminals..."
echo ""

# 1. Backend API
echo "1️⃣  Starting Backend API (Port 4000)..."
run_in_terminal "Backend API :4000" "pnpm dev" "$PROJECT_ROOT/backend"
sleep 2

# 2. AI Service
echo "2️⃣  Starting AI Service (Port 8000)..."
run_in_terminal "AI Service :8000" "source yolo_env/bin/activate && uvicorn app.main:app --reload --port 8000 --host 0.0.0.0" "$PROJECT_ROOT/ai-service"
sleep 2

# 3. Frontend App
echo "3️⃣  Starting Frontend App (Port 3001)..."
run_in_terminal "Frontend App :3001" "pnpm dev" "$PROJECT_ROOT/frontend-app"
sleep 2

# 4. Landing Page
echo "4️⃣  Starting Landing Page (Port 3000)..."
run_in_terminal "Landing Page :3000" "pnpm dev" "$PROJECT_ROOT/landing-page"
sleep 2

echo ""
echo "================================================"
echo "✅ All services started!"
echo ""
echo "📍 Service URLs:"
echo "   Landing Page:  http://localhost:3000"
echo "   Frontend App:  http://localhost:3001"
echo "   Backend API:   http://localhost:4000"
echo "   AI Service:    http://localhost:8000"
echo "   AI Docs:       http://localhost:8000/docs"
echo ""
echo "⏱️  Wait a few seconds for all services to fully start..."
echo ""
echo "🛑 To stop all services:"
echo "   Close the terminal tabs or run: pkill -f 'vite|tsx|uvicorn'"
echo ""
