# Day 1: Foundation of Full-Stack Web Development (Inventory & Employees)

## Concepts Learned Today
* **Express.js Setup:** Initialized the Express applications for both the Inventory backend (port 5000) and Employee backend (port 5001).
* **Express GET Methods:** Defined basic GET endpoints to retrieve data for products and employees.
* **Response Methods:** Explored the difference between `res.send()` (standard response) and `res.json()` (JSON formatted responses with headers) to output lists of products and employees.
* **React Asynchronous Functions:** Implemented async/await calls inside components to fetch data from both backend APIs.
* **List Rendering Keys:** Understood why a unique `key` prop is crucial when rendering products and employees arrays in React to ensure optimal DOM reconciliation.
* **Linking Frontend and Backend:** Hooked up Vite React frontends to request data from their respective Express servers.
* **Axios Library:** Configured Axios clients for cleaner API request management in both modules.

## Mistakes Made
* **List Rendering Error:** Attempted to render list elements directly instead of mapping over the arrays.
* **Async Call Omission:** Forgot to invoke the defined asynchronous fetch functions inside components during mount.

## Debugging Methods
* Searched official React and Express documentation to verify usage patterns.
* Utilized Chrome Developer Tools (Console and Network tabs) to trace execution and network request issues.

## Key Questions Addressed
* **Difference between Normal Variables and useState Variables:** Normal variables reset on every component re-render, whereas `useState` variables persist their values across renders and trigger UI updates.
* **What are API Calls:** Requests made from the React client-side app to local Express servers to fetch or persist data.
