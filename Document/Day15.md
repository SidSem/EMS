# Day 15: Frontend Permission Mapping, Adaptive Layout Grids, and Secure UI Element Masking

## Concepts Learned Today
* **Prop-Passed User Identity:** Passed the global `currentUser` context down through page routes to ensure child tables have visibility into the user's role.
* **Conditional Column Rendering:** Modified table layout logic to hide action headers and cells completely if the active user lacks edit/delete permissions.
* **Responsive Layout Switching:** Leveraged Tailwind CSS grid columns dynamically (e.g., swapping split grids `lg:grid-cols-[380px_1fr]` for full-width views `grid-cols-1`) based on permissions.
* **Component-Level Control Flags:** Passed boolean capabilities (`canEdit`, `canDelete`) to child row components to isolate element rendering from global context hooks.

## Mistakes Made
* **Button Spacing Shifting:** Experienced visual layout shifting when only one action button (Edit or Delete) was rendered; resolved by adjusting alignment styles.
* **Props Drifting Desync:** Forgot to pass down the `currentUser` prop through intermediary layout pages, leaving table headers unable to evaluate access restrictions.

## Debugging Methods
* **Identity Manipulation Testing:** Mocked active user roles inside storage slots manually to check how table displays adjusted in response.
* **DOM Inspector Audits:** Checked element hierarchies in the browser inspector to confirm that unauthorized form elements were completely omitted rather than simply hidden.

## Key Questions Addressed
* **Why should we completely omit elements instead of hiding them with CSS?** CSS-hidden buttons can easily be re-enabled by editing browser styles; completely omitting elements prevents standard users from inspecting or interacting with forbidden controls.
* **How does layout styling respond to dynamically removed panels?** By binding responsive classes directly to state variables, React changes parent wrapper grid constraints instantly to fill empty screen gaps.
