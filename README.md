# Rubik's Timer

A modern, full-stack speedcubing timer and solve tracker built with React 19, TypeScript, Express, and MySQL. Designed for speedcubers to practice, generate WCA-compliant scrambles, visualize cube states, and track solve statistics over time.

![Rubik's Timer Demo](./demo.gif)

---

## Features

- **Precision Speedcubing Timer**
  - Spacebar-controlled timer with inspection/hold-to-start mechanics (Hold -> Red -> Green -> Release to start).
  - Stop timer instantly with any spacebar press.
  - Centisecond accuracy with clean time formatting (`mm:ss.cs`).

- **Official WCA Scrambles**
  - Generates authentic random-state 3x3 scrambles using the official [`cubing`](https://js.cubing.net/cubing/) library (`cubing/scramble`).

- **2D Cube Visualizer**
  - Dynamic 2D scrambled cube net preview using [`twisty-player`](https://js.cubing.net/cubing/twisty/) so you can verify your scramble before solving.

- **User Authentication**
  - User registration and login powered by JSON Web Tokens (JWT) and `bcrypt` password hashing.
  - Persistent login sessions with token management.

- **Solve Tracking & Statistics**
  - Solves and scrambles are automatically saved to your profile when logged in.
  - **Key Speedcubing Metrics**:
    - **PB** (Personal Best)
    - **Ao3** (Average of 3)
    - **Ao5** (Average of 5 with trimmed fastest and slowest solves)
    - **Ao10** (Average of 10 with trimmed fastest and slowest solves)
  - **Progress Chart**: Interactive solve time progression graph powered by Recharts.
  - **Solve History Table**: Complete breakdown of past solves, scrambles, and dates.

---

## Project Structure

```text
rubiks_timer/
├── demo.gif               # Application demo animation
├── package.json           # Root package & dev tools
├── tsconfig.base.json     # Shared TypeScript configuration
├── backend/
│   ├── .env               # Database & JWT environment configuration
│   ├── package.json       # Backend dependencies and scripts
│   └── src/
│       ├── index.ts       # Server entry point
│       ├── config/        # Database connection & Sequelize instance
│       ├── controllers/   # Route controllers (auth, solve, profile)
│       ├── middlewares/   # JWT authentication middleware
│       ├── models/        # Sequelize models (User, Solve, relations)
│       ├── routes/        # Express router endpoints
│       └── schemas/       # Zod validation schemas
└── frontend/
    ├── package.json       # Frontend dependencies and scripts
    ├── vite.config.ts     # Vite & Tailwind configuration
    └── src/
        ├── main.tsx       # React entry point & routing
        ├── auth/          # Auth context & custom hooks
        ├── components/    # Reusable UI components (NavBar, Timer, Visualizer)
        ├── hooks/         # useTimer hook for spacebar handling
        ├── pages/         # Landing (Timer), Login, Register, Profile
        └── utils/         # Time formatting and AoN calculation functions
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)
- [MySQL](https://dev.mysql.com/downloads/) server running locally or remotely

---

### 1. Database & Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create or edit the `.env` file in the `backend/` directory:

   ```env
   DB_NAME=rubiks_database
   DB_USER=root
   DB_PASS=your_mysql_password
   DB_HOST=localhost
   DB_PORT=3306
   SECRET_JWT=your_jwt_secret_key
   BACKEND_PORT=3000
   ```

4. Make sure your MySQL database (`rubiks_database`) exists:

   ```sql
   CREATE DATABASE rubiks_database;
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will connect to MySQL, sync the Sequelize models automatically, and listen on `http://localhost:3000`.

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## How to Use

1. **Start the Timer**:
   - Hold the **Spacebar**.
   - The timer turns **Red** while priming, then **Green** when ready.
   - Release the **Spacebar** to start timing.
2. **Stop the Timer**:
   - Press the **Spacebar** once you finish solving the cube.
3. **Save Your Times**:
   - Create an account via **Sign Up** or log in to automatically record each solve and scramble.
4. **Analyze Progress**:
   - Navigate to **Profile** to view your Personal Best, Ao3, Ao5, Ao10, progress chart, and full solve history.

---

## API Reference

| Method   | Endpoint         | Auth Required | Description                                       |
| :------- | :--------------- | :------------ | :------------------------------------------------ |
| `POST`   | `/register`      | No            | Register a new user (`name`, `email`, `password`) |
| `POST`   | `/login`         | No            | Log in user and receive a JWT token               |
| `POST`   | `/solve`         | Yes           | Save a new solve (`time`, `scramble`)             |
| `DELETE` | `/solve/:id`     | Yes           | Delete a solve by ID                              |
| `GET`    | `/profile`       | Yes           | Get current user profile details                  |
| `GET`    | `/profile/times` | Yes           | Retrieve all solves for the authenticated user    |
| `PUT`    | `/profile/edit`  | Yes           | Update user profile (`name`)                      |
