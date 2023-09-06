#!/bin/bash
# Colors
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Navigate to backend directory and start it
cd backend && npm run dev > /dev/null 2>&1 &

# Navigate to frontend directory and start it
cd frontend && npm start > /dev/null 2>&1 &

# Wait a few seconds to ensure services start
sleep 5

# Print a success message
echo -e "${GREEN}Oncopen started${NC}"
