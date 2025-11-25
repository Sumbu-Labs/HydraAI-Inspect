#!/bin/bash

# HydraAI-Inspect - Stop All Services Script
# This script stops all running services

echo "🛑 Stopping HydraAI-Inspect Services..."
echo "================================================"

# Function to kill processes by pattern
kill_process() {
    local pattern=$1
    local name=$2
    
    pids=$(pgrep -f "$pattern")
    if [ -n "$pids" ]; then
        echo "Stopping $name..."
        pkill -f "$pattern"
        echo "✅ $name stopped"
    else
        echo "ℹ️  $name not running"
    fi
}

# Stop all services
kill_process "vite.*landing-page" "Landing Page"
kill_process "vite.*frontend-app" "Frontend App"
kill_process "tsx watch.*backend" "Backend API"
kill_process "uvicorn.*ai-service" "AI Service"

echo ""
echo "================================================"
echo "✅ All services stopped!"
echo ""
