# Day 3: React State Management and Component Interaction

## Concepts Learned Today
* **React State & Props:** Covered component re-renders triggered by state changes and standard unidirectional data flow via props.
* **Controlled Components:** Bound input elements to React state using standard `value` and `onChange` hooks to ensure React governs the form data.
* **Lifting State Up:** Shared state between sibling components (such as form inputs and tables) by declaring the state in their common parent (`App.jsx`).
* **Interactive Lists:** Rendered tabular records dynamically using array loops in React.

## Mistakes Made
* **Direct State Mutation:** Directly mutated an array in state (using `push()`) instead of returning a new array copy (using spread operators or functions), which prevented proper UI updating.
* **Implicit Event Handler Execution:** Invoked callback handlers inside JSX rendering rather than passing functions (e.g., `onClick={handleClick()}` instead of `onClick={handleClick}`).

## Debugging Methods
* Monitored component hierarchies using React Developer Tools.
* Placed debuggers/breakpoints inside event handlers to trace payload updates.

## Key Questions Addressed
* **Why should state be immutable in React?** React uses shallow reference equality checks to detect changes. Mutating state directly keeps the same reference, so React does not trigger a re-render.
* **How does a child component notify its parent of changes?** The parent component passes a function prop (a callback) down to the child, which the child invokes when an event occurs.
