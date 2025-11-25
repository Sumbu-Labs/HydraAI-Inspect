#!/bin/bash

# HydraAI-Inspect - Check Services Status Script
# This script checks if all services are running and accessible

echo "🔍 Checking HydraAI-Inspect Services Status"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to check if port is listening
check_port() {
    local port=$1
    local name=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${GREEN}✅ $name (Port $port)${NC} - Running"
        return 0
    else
        echo -e "${RED}❌ $name (Port $port)${NC} - Not Running"
        return 1
    fi
}

# Function to check HTTP endpoint
check_http() {
    local url=$1
    local name=$2
    
    if curl -s -f -o /dev/null "$url"; then
        echo -e "${GREEN}✅ $name${NC} - Responding"
        return 0
    else
        echo -e "${RED}❌ $name${NC} - Not Responding"
        return 1
    fi
}

# Check PostgreSQL
echo "📊 Database"
echo "-------------------------------------------"
if command -v psql >/dev/null 2>&1; then
    if pg_isready -h localhost -p 5432 >/dev/null 2>&1; then
        echo -e "${GREEN}✅ PostgreSQL${NC} - Running"
    else
        echo -e "${RED}❌ PostgreSQL${NC} - Not Running"
    fi
else
    echo -e "${YELLOW}⚠️  PostgreSQL client not installed${NC}"
fi
echo ""

# Check Backend API
echo "🔧 Backend Services"
echo "-------------------------------------------"
check_port 4000 "Backend API"
if check_http "http://localhost:4000/health" "Backend Health Check"; then
    response=$(curl -s http://localhost:4000/health)
    echo "   Response: $response"
fi
echo ""

# Check AI Service
echo "🤖 AI Service"
echo "-------------------------------------------"
check_port 8000 "AI Service"
if check_http "http://localhost:8000/health" "AI Service Health Check"; then
    response=$(curl -s http://localhost:8000/health)
    echo "   Response: $response"
fi
echo ""

# Check Frontend Services
echo "🎨 Frontend Services"
echo "-------------------------------------------"
check_port 3001 "Frontend App"
check_port 3000 "Landing Page"
echo ""

# Summary
echo "================================================"
echo "📍 Service URLs:"
echo "   Landing Page:  http://localhost:3000"
echo "   Frontend App:  http://localhost:3001"
echo "   Backend API:   http://localhost:4000"
echo "   AI Service:    http://localhost:8000"
echo "   AI Docs:       http://localhost:8000/docs"
echo ""

# Check if all critical services are running
all_running=true
if ! lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    all_running=false
fi
if ! lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    all_running=false
fi

if [ "$all_running" = true ]; then
    echo -e "${GREEN}✅ All critical services are running!${NC}"
else
    echo -e "${YELLOW}⚠️  Some services are not running. Use ./start-all.sh to start them.${NC}"
fi
echo ""
