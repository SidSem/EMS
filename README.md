# EMS (Employee & Inventory Management System)

A unified enterprise full-stack application containing:
1. **INVENTORY:** Product & stock management.
2. **EMPLOYEE:** Employee directory & staffing tracker.

Built with a Node.js/Express backend, React/Vite frontend, and a shared MySQL database (`ems_db`).

---

## 🚀 Project Architecture & Ports

```text
EMS/ (Root Workspace)
├── DOCUMENT/             # Daily learning and implementation journals
├── Backend/              # Unified Express app (runs on port 5000)
├── Frontend/             # Unified React/Vite app (runs on port 5173)
└── README.md             # Global project documentation
```

---

## 🛠️ Database Setup

Ensure you have a local MySQL server installed. Create the shared `ems_db` database and define both tables:

1. **Create Database:**
   ```sql
   CREATE DATABASE ems_db;
   USE ems_db;
   ```

2. **Create Products Table:**
   ```sql
   CREATE TABLE products (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       quantity INT NOT NULL,
       category VARCHAR(100) NOT NULL
   );
   ```

3. **Create Employees Table:**
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

4. **Database Configuration:**
   Configure connection credentials in [Backend/config/db.js](file:///d:/comeBack/EMS/Backend/config/db.js).

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
