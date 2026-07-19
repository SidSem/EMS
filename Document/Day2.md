# Day 2: Backend API and MySQL Integration (Inventory & Employees)

## Concepts Learned Today
* **RESTful API Principles:** Explored HTTP methods (GET, POST, PUT, DELETE) and resource pathways for managing products (under `http://localhost:5000/products`) and employees (under `http://localhost:5001/employees`).
* **Express Routing:** Created dedicated endpoints to query mysql database models and handle client-side payloads.
* **CORS (Cross-Origin Resource Sharing):** Configured CORS middleware in both Express servers to securely allow incoming requests from Vite frontends running on port 5173.
* **MySQL Setup with Node:** Established database connections using `mysql2` client library to run structured queries against `products` and `employees` tables inside `ems_db`.

## Mistakes Made
* **Express JSON Middleware Omission:** Forgot to execute `app.use(express.json())` on backend apps, leading to incoming request bodies returning as `undefined`.
* **SQL Injection Vulnerability:** Wrote raw concatenated strings for SQL queries initially, instead of parameterized queries.

## Debugging Methods
* Added console logs (`console.log(req.body)`) to check payload arrivals.
* Tested API responses using curl and Postman to isolate backend queries from frontend issues.

## Key Questions Addressed
* **Why do we need CORS?** Browsers block client-side scripts from reading responses of requests made to different domains/ports unless the destination server includes CORS headers.
* **Why use parameterized queries?** They separate SQL instructions from parameter values, eliminating SQL injection vulnerability.
