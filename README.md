# EMS (Employee & Inventory Management System)

A unified enterprise full-stack application containing:
1. **INVENTORY:** Product & stock management.
2. **EMPLOYEE:** Employee directory & staffing tracker.

Built with a Node.js/Express backend, React/Vite frontend, a shared MySQL database (`ems_db`), and protected by secure JWT authentication and Role-Based Access Control (RBAC).

---

## 🚀 Project Architecture & Ports

```text
EMS/ (Root Workspace)
├── DOCUMENT/             # Daily learning and implementation journals (Days 1 - 15)
├── Backend/              # Unified Express app (runs on port 5000)
│   ├── config/           # Database connections
│   ├── controllers/      # Route controllers (employees, products, auth)
│   ├── middleware/       # JWT and RBAC middlewares
│   ├── routes/           # Router groups
│   └── seeders/          # Database seeding scripts using Faker.js
├── Frontend/             # Unified React/Vite app (runs on port 5173)
│   ├── src/
│   │   ├── components/   # Structured, responsive views
│   │   ├── pages/        # Dashboard, Employee, Product, and Login pages
│   │   └── services/     # API request services and Axios interceptors
└── README.md             # Project documentation
```

---

## 🛠️ Database Setup

Ensure you have a local MySQL server installed. Create the shared `ems_db` database and define the tables:

### 1. Create Database
```sql
CREATE DATABASE ems_db;
USE ems_db;
```

### 2. Create Products Table
```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    category VARCHAR(100) NOT NULL
);
```

### 3. Create Employees Table
```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone BIGINT NOT NULL,
    department VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,
    salary FLOAT NOT NULL,
    joining_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL
);
```

### 4. Create Users Table (Authentication)
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'User',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Database Credentials Configuration
Configure connection credentials in [Backend/config/db.js](file:///d:/comeBack/EMS/Backend/config/db.js).

---

## 💾 Database Seeding

The project uses `@faker-js/faker` to generate mock data. To clear and populate the database with approximately 100 products and 40-50 employees:

```bash
cd Backend
npm run seed
```

---

## 🛡️ Authentication & Authorization (JWT & RBAC)

This system uses stateless JWT tokens for sessions and checks permissions dynamically on both backend endpoints and frontend views.

### Role Authorization Matrix

| Role | Employee CRUD | Product CRUD | Actions Visible |
| :--- | :--- | :--- | :--- |
| **Admin** | Read, Add, Edit, Delete | Read, Add, Edit, Delete | Full Action Controls |
| **Manager** | Read-Only | Read, Add, Edit (No Delete) | Product-only Actions |
| **User (Staff)** | Read-Only | Read-Only | Read-only Views (Actions Hidden) |

### API Protection
Protected endpoints require passing the authorization header:
`Authorization: Bearer <your_jwt_token>`

---

## 🚦 Getting Started

### Backend (Port 5000)
```bash
cd Backend
npm install
npm run dev
```

### Frontend (Port 5173)
```bash
cd Frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser. Register an administrator account, sign in, and access the application dashboard.
