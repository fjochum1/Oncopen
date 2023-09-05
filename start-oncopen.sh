#!/bin/bash
# Colors
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Navigate to backend directory and start it
cd backend && npm run dev &

# Navigate to frontend directory and start it
cd frontend && npm start &

# Print a success message
echo -e "${GREEN}Oncopen started${NC}"
