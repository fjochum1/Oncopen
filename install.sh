#!/bin/bash
# Colors
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Navigate to backend directory and start it
cd backend && npm i
content_back="SQLITE_PATH=database.db
PORT=8081
SECRET=martinjosephmeyer17072020
REACT_APP_BACKEND_SERVER='http://localhost:8081/api'"
echo "$content_back" > .env

cd ..

# Navigate to frontend directory and start it
cd frontend && npm run build
content_front="SQLITE_PATH=database.db
PORT=3001
SECRET=martinjosephmeyer17072020
REACT_APP_BACKEND_SERVER='http://localhost:8081/api'"
echo "$content_front" > .env

cd ..

# Print a message for the user
echo -e "${GREEN}All dependencies installed${NC}"
echo -e "${GREEN}.env file has been created${NC}"
