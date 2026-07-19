# Day 3: React State Management and Component Interaction (Inventory & Employees)

## Concepts Learned Today
* **React State & Props:** Covered component re-renders triggered by state modifications and standard unidirectional data flow via props.
* **Controlled Components:** Bound input fields in `ProductForm` and `EmployeeForm` to React state using standard `value` and `onChange` hooks.
* **Lifting State Up:** Shared state between sibling components (such as form inputs and data grids) by declaring state hooks in their common parent (`App.jsx`).
* **Interactive Lists:** Rendered tabular records (Product rows & Employee rows) dynamically using array map functions.

## Mistakes Made
* **Direct State Mutation:** Directly mutated array items in state (using `push()`) instead of returning a new array copy (using spread operators), preventing UI updates.
* **Implicit Event Handler Execution:** Invoked callback handlers inside JSX rendering rather than passing function references (e.g., `onClick={handleClick()}` instead of `onClick={handleClick}`).

## Debugging Methods
* Monitored component state hierarchies using React Developer Tools.
* Placed debuggers and console checkpoints inside event handlers to trace payload updates.

## Key Questions Addressed
* **Why should state be immutable in React?** React uses shallow reference equality checks. Mutating state directly keeps the same reference, so React fails to trigger re-renders.
* **How does a child component notify its parent of changes?** The parent component passes callback function props to the child, which the child invokes when actions/events occur.
