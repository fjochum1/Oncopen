#!/bin/bash
# Colors
RED='\033[0;31m'
NC='\033[0m' # No Color

# Kill port
kill -9 $(lsof -ti:3001,8081)

# Print a success message
echo -e "${RED}Oncopen ended${NC}"
