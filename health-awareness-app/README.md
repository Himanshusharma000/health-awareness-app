# ❤️ Health Awareness App

A full-stack web application for presenting health information through a responsive React interface backed by a Node.js/Express API and MongoDB database.

## ✨ Features

- Multi-page React UI with Home, Articles, BMI Calculator and Contact sections
- Responsive interface with animations and client-side routing
- REST API for curated health articles and subscriptions
- MongoDB persistence with seed data for quick setup
- Docker and Docker Compose configuration for multi-container development
- Environment-variable based configuration

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Router  
**Backend:** Node.js, Express, Mongoose  
**Database:** MongoDB  
**DevOps:** Docker, Docker Compose

## 📁 Project Structure

```text
health-awareness-app/
├── frontend/          # React/Vite client
├── backend/           # Node/Express API
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 Run with Docker

Prerequisite: Docker Desktop.

```bash
docker-compose up --build
```

Then open the frontend at `http://localhost:3000` and the API at `http://localhost:5000` according to the current container configuration.

## 💻 Run Without Docker

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will display its local URL in the terminal.

## 🔐 Configuration

Copy `.env.example` to `.env` and provide the required MongoDB connection settings before starting the backend.

> Portfolio project for demonstrating full-stack development, REST APIs, database integration and containerized application setup.
