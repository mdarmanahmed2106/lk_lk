# LK Platform - Run Instructions

Welcome to the LocalKonnect (LK) Platform! This is a full-stack application with a React frontend, Node.js/Express backend, and MongoDB database.

Follow these steps to run the entire project locally.

## 📋 Prerequisites

Ensure you have the following installed:
1.  **Node.js**: [Download here](https://nodejs.org/)
2.  **MongoDB**: [Download Community Server](https://www.mongodb.com/try/download/community)
    *   *Alternative*: You can use a cloud MongoDB URL in your `.env` file.

---

## 🚀 Step 1: Start the Database

Make sure MongoDB is running on your machine.
- **Windows**: Open Task Manager > Services and ensure `MongoDB` is Running, or run `net start request` in admin terminal.
- **Mac/Linux**: Run `brew services start mongodb-community`.

---

## 🔙 Step 2: Setup & Run Backend

The backend handles the API, authentication, and database connections.

1.  Open a new terminal.
2.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
3.  Install dependencies (first time only):
    ```bash
    npm install
    ```
4.  Start the backend server:
    ```bash
    npm run dev
    ```
    > You should see: `Server running on port 5000` and `MongoDB Connected`.

---

## 🎨 Step 3: Setup & Run Frontend

The frontend is the React application you interact with.

1.  Open a **second** terminal window.
2.  Navigate to the root project folder (`finallll`):
    ```bash
    # If you are in backend, go back one level:
    cd ..
    ```
3.  Install dependencies (first time only):
    ```bash
    npm install
    ```
4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    > You should see: `Running at http://localhost:5173`

---

## 🌐 Step 4: Access the Website

Open your browser and navigate to:
**http://localhost:5173**

---

## 🔐 Admin Access

To access the Admin Dashboard:

1.  Go to `http://localhost:5173/login`
2.  Login with these credentials:
    *   **Email**: `admin@lk.com`
    *   **Password**: `admin123`
3.  You will be automatically redirected to the **Admin Dashboard**.

---

## ❓ Troubleshooting

*   **"Connection Refused"**: Ensure the Backend server is running on port 5000.
*   **"Database Connection Error"**: Ensure MongoDB is running locally on port 27017.
*   **"Module not found"**: Make sure you ran `npm install` in **BOTH** the root folder and the `backend` folder.