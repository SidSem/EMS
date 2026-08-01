# Day 10: Full-Stack Auth Integration, Schema Alignment, and JWT Guarding

## Concepts Learned Today
* **JWT Route Protection:** Configured client-side route protection by intercepting Axios requests to attach JWT tokens and redirecting on 401/403 authorization failures.
* **Database Refactoring (Schema Alignment):** Standardized column names by renaming the misspelled `passowrd` column in the `users` table to the standard spelling `password`.
* **Session Persistence:** Managed authentication tokens and user meta-information using browser `localStorage` to keep users logged in across page reloads.
* **Client-Side Auth Rendering:** Restructured the React entry point (`App.jsx`) to render a Login/Register page dynamically when no valid token is found.

## Mistakes Made
* **Mismatched Column Spelling:** Initially matched database query code to the misspelled `passowrd` schema column, which required refactoring code and database column schema back to standard naming `password`.
* **Global Axios Interceptor State Binding:** Experienced reload loops due to infinite interceptor triggers on initial 401 catches, which was resolved by purging storage before refreshing.

## Debugging Methods
* **Database Schema Renaming:** Ran `ALTER TABLE users RENAME COLUMN passowrd TO password` in the database manager to resolve naming mismatches.
* **Storage Auditing:** Inspected the browser Application storage tab in Chrome DevTools to ensure JWT tokens were correctly stored, loaded, and deleted on logout.

## Key Questions Addressed
* **Why is standardizing database schema naming important?** Inconsistent column spellings lead to developer confusion, mapping errors, and code fragility during CRUD queries.
* **How does the frontend react to expired sessions?** The Axios response interceptor intercepts any 401 response from the server, clears local credentials, and refreshes the application, forcing an automatic redirect to the login gate.
