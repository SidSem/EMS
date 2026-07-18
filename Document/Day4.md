# Day 4: Full-Stack Integration and Data Fetching

## Concepts Learned Today
* **Axios Integration:** Handled custom headers, base URLs, and async request operations.
* **Component Mounting Hooks:** Loaded remote database records when components mount using standard React `useEffect`.
* **Asynchronous Flow Management:** Configured conditional state loaders and indicators while waiting for network requests.
* **API Error Boundaries:** Captured network errors using `try/catch` wrappers to prevent frontend crashes when the database server is offline.

## Mistakes Made
* **Infinite Fetch Loop:** Omitted the dependency array `[]` in `useEffect`, resulting in API requests executing on every single state change.
* **Mismatched Server Port:** Experienced network errors because of mismatched host addresses and ports between backend (5000) and frontend (5173).

## Debugging Methods
* Tracked API routes and payloads under the Network tab of Google Chrome DevTools.
* Monitored console logs on both server and client to trace connection issues.

## Key Questions Addressed
* **What is the significance of the dependency array in useEffect?** The dependency array determines when the effect should run. An empty array `[]` ensures the effect runs only once when the component mounts.
* **How can you handle API failures gracefully?** Wrap network calls in `try/catch` and save error states to render fallback UI messages if requests fail.
