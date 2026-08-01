# Day 11: Modular Form Validation, Dynamic Dropdowns, and Interactive CRUD Controls

## Concepts Learned Today
* **Dual-State Form Handling:** Configured forms to alternate seamlessly between creation and editing modes based on whether a parent state is passed down (e.g., `selectedEmployee` or `selectedProduct`).
* **Interactive Dropdown Mapping:** Built dynamically populated select menus to handle categorized input properties (like departments, roles, and status levels) without hardcoded duplicate inputs.
* **Callback Hook Updates:** Set up data refetch triggers (`onEmployeeAdded`, `onProductAdded`) to automatically refresh the listing tables in parent pages upon form submissions.
* **Form Clearance Workflows:** Designed a simple `clearSelection` mechanism to reset input states and return components to creation mode when editing actions are aborted.

## Mistakes Made
* **Stale Input Refilling:** Forgot to clear local states when switching between edits of different entities, causing fields from the previous selection to carry over.
* **Missing Key Indicators:** Omitted form state indicators, leaving users confused about whether they were submitting a new record or updating an existing one.

## Debugging Methods
* **React DevTools Props Inspecting:** Watched the propagation of `selectedProduct` state inside form component props during user clicks to ensure values matched exactly.
* **Form Reset Triggers:** Checked text field values inside forms manually to confirm they reset to empty strings when cancel buttons were clicked.

## Key Questions Addressed
* **How can a single form handle both creations and updates safely?** By tracking the presence of a selected item ID. If the ID exists, the form submits a PUT request to the database; if not, it submits a POST request to create a new entry.
* **Why pass state-clearing callbacks up to the parent component?** Keeping state management unified in the parent page ensures that lists, selected states, and forms stay synchronized.
