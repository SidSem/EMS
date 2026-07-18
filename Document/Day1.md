# Day 1: Foundation of Full-Stack Web Development

## Concepts Learned Today
* **Express.js Setup:** Initialized an Express application and set up a basic local server.
* **Express GET Methods:** Learned how to define GET endpoints to retrieve data.
* **Response Methods:** Explored the difference between `res.send()` (sends standard response) and `res.json()` (sends JSON formatting and sets content-type headers).
* **React Asynchronous Functions:** Implemented async/await calls inside components to fetch data from the server.
* **List Rendering Keys:** Understood why a unique `key` prop is crucial when rendering array elements in React to ensure optimal DOM reconciliation.
* **Linking Frontend and Backend:** Hooked up a Vite React frontend to request data from the local Express server.
* **Axios Library:** Installed and configured Axios for cleaner API request management.

## Mistakes Made
* **List Rendering Error:** Attempted to render list elements directly instead of mapping over the array.
* **Async Call Omission:** Forgot to invoke the defined asynchronous fetch function inside the component.

## Debugging Methods
* Searched official React and Express documentations to review correct usage patterns.
* Utilized Chrome Developer Tools (Console and Network tabs) to trace runtime execution errors.

## Key Questions Addressed
* **Difference between Normal Variables and useState Variables:** Normal variables reset on every component re-render, whereas `useState` variables persist their value across renders and trigger UI updates when changed.
* **What are API Calls:** Requests made from the client-side app to an external server or backend API to fetch or persist data.
