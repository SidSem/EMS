# Day 4: Full-Stack Integration and Data Fetching (Inventory & Employees)

## Concepts Learned Today
* **Axios Integration:** Handled custom configurations, base URLs, and async request operations inside `ProductService` and `EmployeeService`.
* **Component Mounting Hooks:** Loaded remote database records when components mount using React `useEffect`.
* **Asynchronous Flow Management:** Configured conditional state loaders and status badges while waiting for network requests.
* **API Error Boundaries:** Captured network errors using `try/catch` wrappers to prevent frontend crashes when backend servers are offline.

## Mistakes Made
* **Infinite Fetch Loop:** Omitted dependency arrays `[]` in `useEffect`, resulting in API requests executing repeatedly on every state change.
* **Mismatched Server Ports:** Experienced network connection errors due to mismatched host addresses and ports between backends (5000 / 5001) and client frontends.

## Debugging Methods
* Tracked API routes and payloads under the Network tab of Google Chrome DevTools.
* Monitored console logs on both server and client to trace connection issues.

## Key Questions Addressed
* **What is the significance of the dependency array in useEffect?** The dependency array determines when the effect should run. An empty array `[]` ensures the effect runs only once when the component mounts.
* **How can you handle API failures gracefully?** Wrap network calls in `try/catch` and save error states to render fallback UI messages if requests fail.
