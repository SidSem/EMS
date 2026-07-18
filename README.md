# EMS (Employee/Equipment Management System)

A full-stack product and inventory management web application built with a Node.js/Express backend and a React/Vite frontend, using MySQL as the database.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Styling:** Vanilla CSS
- **API Client:** Axios
- **Linting:** Oxlint

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database driver:** MySQL2
- **Tools:** Nodemon (for development auto-restart)
- **Cors:** CORS enabled for frontend connection

---

## 📁 Project Structure

```text
EMS/
├── Backend/
│   ├── config/
│   │   └── db.js          # MySQL connection configuration
│   ├── server.js          # Express app, middleware, and API endpoints
│   ├── package.json       # Backend scripts and dependencies
│   └── node_modules/      # Backend packages
├── Frontend/
│   ├── src/
│   │   ├── components/    # Reusable React components (ProductForm, ProductTable, etc.)
│   │   ├── services/      # Axios service files for API interaction
│   │   ├── App.jsx        # Main React container logic
│   │   └── index.css      # Core styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json       # Frontend scripts and dependencies
├── Document/              # Daily learning and implementation journals (Day 1 - Day 5)
└── README.md              # Root project documentation
```

---

## 🛠️ Database Setup

Before running the application, set up a MySQL database named `ems_db` and ensure you have the `products` table created.

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

3. **Configure Connection:**
   Update the MySQL database credentials in [db.js](file:///d:/comeBack/EMS/Backend/config/db.js):
   ```javascript
   const db = mysql.createConnection({
       user: "root",
       password: "YOUR_PASSWORD",
       host: "localhost",
       database: "ems_db"
   });
   ```

---

## 🚦 Getting Started

Follow these steps to run both the backend and frontend servers.

### 1. Backend Server Setup

Navigate to the `Backend` directory:
```bash
cd Backend
```

Install dependencies:
```bash
npm install
```

Start the backend server in development mode (runs on port `5000` with auto-reload):
```bash
npm run dev
```

The server exposes the following API endpoints:
- `GET /` - Root confirmation message.
- `GET /about` - About page info.
- `GET /products` - Retrieve list of all products.
- `POST /products` - Create a new product.
- `PUT /products/:id` - Update an existing product.

### 2. Frontend App Setup

Navigate to the `Frontend` directory:
```bash
cd Frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The application will be accessible at the Vite default URL (typically `http://localhost:5173`).

---

## 📝 Features & Development History

This project was developed incrementally over several days. You can find detailed progression notes, concept logs, design decisions, and debugging summaries in the `Document/` folder:
- [Day 1: Foundation of Full-Stack Web Development](file:///d:/EMS/Document/Day1.md)
- [Day 2: Database Connectivity](file:///d:/EMS/Document/Day2.md)
- [Day 3: Form Inputs and State Management](file:///d:/EMS/Document/Day3.md)
- [Day 4: List Rendering and CRUD Components](file:///d:/EMS/Document/Day4.md)
- [Day 5: End-to-End Edit and Update Functionality](file:///d:/EMS/Document/Day5.md)
