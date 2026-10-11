# ❤️ Health Awareness App

A full-stack web application for presenting health information through a responsive React interface backed by a Node.js/Express API and MongoDB database.

> **Portfolio project:** Demonstrates frontend development, REST APIs, database integration, validation, CI checks and containerized development. It is not a medical diagnosis or treatment system.

## ✨ Features

- Multi-page React UI with Home, Articles, BMI Calculator and Contact sections
- Responsive interface with animations and client-side routing
- REST API for health articles, subscriptions and service health checks
- MongoDB persistence with seed data for local development
- Environment-variable based configuration
- Docker and Docker Compose setup
- Automated frontend lint/build and backend syntax checks through GitHub Actions

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Router  
**Backend:** Node.js, Express, Mongoose, express-validator  
**Database:** MongoDB  
**DevOps:** Docker, Docker Compose, GitHub Actions

## 🏗️ Architecture

```text
React / Vite frontend
        │
        │ HTTP / REST
        ▼
Node.js + Express API
        │
        │ Mongoose
        ▼
     MongoDB
```

The backend exposes a lightweight `GET /api/health` endpoint that can be used for service health checks without requiring a database query.

## 📁 Project Structure

```text
health-awareness-app/
├── frontend/              # React/Vite client
│   ├── src/
│   └── Dockerfile
├── backend/               # Node/Express API
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── server.js
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 Run with Docker

Prerequisite: Docker Desktop.

```bash
cd health-awareness-app
docker compose up --build
```

The current configuration exposes the frontend and backend according to `docker-compose.yml`.

## 💻 Run Without Docker

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite prints the frontend development URL in the terminal.

### Backend validation check

```bash
cd backend
npm test
```

This runs Node's syntax checker against the server and API routes without requiring MongoDB.

## 🔐 Configuration

Copy the environment template and configure MongoDB before starting the backend:

```bash
cp .env.example .env
```

Never commit real credentials, connection strings or secrets.

## 🧪 Development & CI

- Backend API routes are grouped under `/api`.
- MongoDB models live under `backend/models/`.
- Seed data is provided for local/demo setup.
- The frontend is independently runnable with Vite.
- GitHub Actions runs backend checks plus frontend lint/build on changes to the web application.

## 📌 Limitations

This is a portfolio/demo application. Health content and calculators should not be treated as professional medical advice.
