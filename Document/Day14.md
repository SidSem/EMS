# Day 14: Role-Based Access Control (RBAC) Design and Backend Endpoint Protection

## Concepts Learned Today
* **Role Verification Middlewares:** Created a modular function (`authorizeRoles`) that processes target security parameters and verifies request profiles before routing execution.
* **REST Route Layering:** Integrated security constraints onto individual controller actions (e.g. reserving DELETE queries to `Admin` only while allowing `Manager` editing).
* **HTTP 403 Forbidden Response Standards:** Set up descriptive error handling to return structured forbidden responses when authenticated sessions lack role clearance.
* **Granular Resource Access Control:** Implemented decoupled security barriers separating employee roster details from inventory tracking logs.

## Mistakes Made
* **Middleware Execution Order:** Mounted `authorizeRoles` before `authMiddleware` in early route drafts, causing server crashes because user context was not yet decoded.
* **Implicit Role Assumptions:** Forgot to verify the existence of the `role` property in decoded JWT payloads, resulting in undefined access checks.

## Debugging Methods
* **HTTP Request Emulation:** Tested endpoints directly with custom headers (`Authorization: Bearer <token>`) containing different roles to confirm block behaviors.
* **Middleware Error Catchers:** Injected log checkers inside validation layers to print verified access lists against active session properties.

## Key Questions Addressed
* **Why should role checking happen separately from general auth verification?** Isolation of concerns: one layer verifies the user's identity (who they are), while the next layer checks their authorization permissions (what they are allowed to do).
* **How do we handle missing or invalid roles safely?** By defaulting to standard, low-clearance role configurations and returning a strict `403 Forbidden` response.
