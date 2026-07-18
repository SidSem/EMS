# Day 5: End-to-End Edit and Update Functionality

## Concepts Learned Today
* **SQL UPDATE Queries:** Wrote parameterized update statements to modify database entries safely.
* **Express Path Parameters:** Used URL parameters (e.g. `/products/:id`) and extracted them via `req.params`.
* **Form Prefilling:** Tracked selection state in parent container and applied `useEffect` listeners to populate form inputs when editing.
* **Dynamic Submit Handling:** Modified forms to support dual roles (Creation and Updating) by changing behavior and UI text depending on the presence of a selected item.

## Mistakes Made
* **Missing React Edit Callback Prop:** Forgot to pass down the edit action through the intermediate container table component.
* **Lack of Edit Mode Reset:** Submitted updates but did not clear the active selection, leaving the form locked in edit mode.

## Debugging Methods
* Monitored React state updates in real time using devtools.
* Checked DB rows before and after submitting update operations to confirm updates were successful.

## Key Questions Addressed
* **How does Express parse route parameters?** Express extracts path variables defined in routes using the `req.params` dictionary.
* **How can a form serve both Add and Edit capabilities?** By referencing a `selectedItem` state. If present, the form prefills with its data and routes submit events to a PUT endpoint; if null, it resets inputs and routes to a POST endpoint.
