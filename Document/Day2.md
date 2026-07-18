# Day 2: Backend API and MySQL Integration

## Concepts Learned Today
* **RESTful API Principles:** Explored standard HTTP methods (GET, POST, PUT, DELETE) and path configuration for API resources.
* **Express routing:** Created dedicated endpoints to query database models and handle client requests.
* **CORS (Cross-Origin Resource Sharing):** Configured CORS middleware in Express to securely allow requests from different origins (specifically from Vite on port 5173 to Express on port 5000).
* **MySQL Setup with Node:** Established connections using `mysql2` client library to execute structured SQL statements directly from Express routes.

## Mistakes Made
* **Express JSON Middleware Omission:** Forgot to use `app.use(express.json())`, leading to request bodies returning `undefined`.
* **SQL Injection Vulnerability:** Wrote raw concatenated strings for SQL queries initially, instead of parameterized queries.

## Debugging Methods
* Added console logs (`console.log(req.body)`) to check payload arrivals.
* Tested API responses using curl and Postman to isolate backend logic from frontend issues.

## Key Questions Addressed
* **Why do we need CORS?** Browsers block client-side scripts from reading responses of requests made to a different domain for security, unless the server specifies CORS headers.
* **Why use parameterized queries?** They separate SQL code from data parameters, eliminating SQL injection vulnerabilities.
