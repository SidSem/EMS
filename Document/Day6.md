# Day 6: Module Replication, Database Customization, and Documentation Consolidation

## Concepts Learned Today
* **Microservices Port Separation:** Configured the Employee backend to run on port `5001` to allow concurrent execution alongside the Inventory backend running on port `5000`.
* **Database Schema Synchronization:** Structured and mapped frontend forms, state models, and backend SQL commands to match the specific types and properties of the `employees` table (`BIGINT` for phone numbers, `FLOAT` for salary, and `DATE` format handling).
* **Workspace Refactoring:** Combined separate `Document/` folders and `README.md` files into single root-level resources for cleaner multi-module project management.
* **Parent-Child Dependency Resolution:** Learned how Vite and Rollup/Rolldown resolve shared third-party modules (like `axios` and `mysql2`) from workspace root `node_modules` folders.

## Mistakes Made
* **Missing Root Workspace Installation:** Run frontend builds without first installing root-level project dependencies, which caused compilation errors during module resolution.
* **Redundant Documentation Overhead:** Initially kept separate journal copies, causing code documentation duplication before consolidating them to the root.

## Debugging Methods
* Monitored Vite compiler output to trace rolldown build errors back to missing workspace-level node modules.
* Used PowerShell commands to remove redundant directories and files securely.

## Key Questions Addressed
* **Why did the frontend build fail to resolve Axios?** The frontend code imported `axios`, but the dependency was not in the frontend's local `package.json`. Once installed in the root folder, Node's module resolution successfully looked up the parent workspace's `node_modules`.
* **Why combine module documentation?** To represent the workspace as a single cohesive project and avoid managing separate journals for closely related sub-systems.
