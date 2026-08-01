# Day 9: Modular Security, Password Hashing, and Authentication Route Stubbing

## Concepts Learned Today
* **API Route Partitioning:** Structured server endpoints into distinct router modules (`authRoutes.js`, `employeeRoutes.js`, `productRoutes.js`) to isolate routes clean and maintainable.
* **Password Encryption Standards:** Implemented standard encryption logic using `bcrypt` to securely salt and hash credentials.
* **Session Token Configuration:** Configured JSON Web Tokens (JWT) to establish signed, tamper-proof user sessions.
* **Route Middleware Interceptors:** Planned and structured auth verification middleware hooks to validate incoming HTTP headers before hitting controllers.

## Mistakes Made
* **Duplicate Mount Handlers:** Double-mapped routing triggers in `server.js`, causing request confusion and unexpected path routing.
* **Missing JSON Middleware Parser:** Attempted to parse authentication payloads before registering `express.json()` in the application middleware stack, resulting in empty bodies.

## Debugging Methods
* **HTTP Endpoint Auditing:** Sent simulated requests directly to `/auth` router endpoints to confirm proper JSON header response formats.
* **Middleware Logging Hook:** Injected inline `console.log(req.body)` calls to locate exactly where incoming parameters were failing to propagate.

## Key Questions Addressed
* **What is the advantage of stateless JWT auth over stateful sessions?** JWTs store user authorization data inside the token itself, eliminating database lookups on every request and allowing the API to scale.
* **Why use bcrypt hashing instead of basic hash algorithms like MD5 or SHA256?** Bcrypt utilizes key stretching and unique salts for every record, preventing rainbow table attacks and protecting passwords against brute-force attacks.
