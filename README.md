# Task Allocator App

A MERN (MongoDB, Express, React, Node.js) based web application for managing agents and distributing tasks.

## Features

- Admin authentication (Login/Register)
- Add and view agents
- Upload and distribute task lists to agents
- View agent-wise task allocations
- Delete agents and clear distributed tasks

---

## Prerequisites

- Node.js (v16 or above)
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- npm or yarn

---

## Folder Structure

```
project-root/
│
├── backend/         # Express + MongoDB backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── .env
│   └── server.js
│
├── frontend/        # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🔧 Backend Setup

1. Navigate to the backend folder:

```bash
cd Task-Allocator-Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-allocator
JWT_SECRET=your_jwt_secret
```

4. Start the server:

```bash
npm start
```

---

## 💻 Frontend Setup

1. Open a new terminal and navigate to the frontend folder:

```bash
cd Task-Allocator-Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm run dev
```

It will open in your browser at `http://localhost:5173`.

---

## 🔐 Default Pages

- Register: `/register`
- Login: `/login`
- Agent Dashboard: `/add-agent`
- Task Distribution: `/my-lists`

---

## 🛠️ API Endpoints (Backend)

- `POST /api/register` – Register admin
- `POST /api/login` – Login admin
- `POST /api/add-agent` – Add agent
- `GET /api/agent` – Get all agents
- `DELETE /api/delete-agent/:id` – Delete agent
- `POST /api/upload-list` – Upload task list
- `GET /api/my-lists` – Get all tasks
- `DELETE /api/deletelists` – Clear all tasks

---

## 📦 Tech Stack

- **Frontend**: React, Axios, React Router Dom
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Styling**: CSS

---

## ✅ Notes

- Ensure MongoDB is running locally or connected via MongoDB Atlas.
- Use Postman or your frontend to test API routes.
- The app uses token-based authentication with localStorage.

---

## 📄 License

This project is licensed under the MIT License.