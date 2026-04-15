# Health Awareness App

A full-stack, containerized web application designed to track and spread health awareness.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, React Router Dom
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Features
- Complete multi-page React structure with Home, Articles, BMI Calculator, and Contact sections.
- Animated, visually stunning, fully responsive UI.
- Secure backend API to handle fetching curated articles and validating user subscriptions.
- MongoDB persistent data storage and automatic databse seeding for quick setup.
- Comprehensive multiple-container setups ready with Docker Compose.

## Project Structure
```bash
/health-awareness-app
  /frontend     # React web UI
  /backend      # Node/Express API
  docker-compose.yml 
  README.md     
  .env.example  
```

## Running Locally Using Docker

1. **Prerequisites**: Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed.
2. Clone this repository (or navigate to this folder).
3. To start using Docker, run step 4 on your terminal.
4. Execute:
   ```bash
   docker-compose up --build
   ```
5. Once started, open your browser and navigate to:
   - **Frontend UI**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   
Note: The database seed will automatically trigger and provide health articles out of the box when the backend connects to MongoDB.

## Running Locally Without Docker

1. **Prerequisites**: Node.js and MongoDB installed locally.
2. In the `backend` folder, install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Run the backend (API will be available at http://localhost:5000):
   ```bash
   node server.js
   ```
4. In another terminal, go to the `frontend` folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
5. Start the frontend development server (UI available at http://localhost:5173):
   ```bash
   npm run dev
   ```
