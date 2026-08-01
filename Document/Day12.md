# Day 12: Grid Layouts, Tailwind CSS Styling, and UI Theme Switching

## Concepts Learned Today
* **CSS Grid Split Views:** Designed responsive side-by-side splits (`grid-cols-1 lg:grid-cols-[380px_1fr]`) to lock forms on the left while tables expand on the right.
* **Sticky Layout Locking:** Implemented CSS sticky behaviors (`lg:sticky lg:top-8`) on form components so they remain visible on screen when scrolling through long data tables.
* **Dark Mode Theme Switching:** Integrated state-driven theme switching, injecting or removing the `.dark` class on the `<html>` root node depending on user selection.
* **Theme Preference Storage:** Leveraged `localStorage` to save user theme preferences so settings persist across page refreshes.

## Mistakes Made
* **Layout Truncation:** Experienced table overflow constraints on smaller viewports due to missing `min-w-0` styles on wrapper divisions, which broke mobile responsiveness.
* **Flickering Themes:** Experienced page flickering during initial loads due to a delay in reading the theme value from localStorage during React's mount lifecycle.

## Debugging Methods
* **Browser Sandbox Resizing:** Shrank browser windows dynamically to test mobile breakpoints and locate grid layout breakages.
* **DevTools DOM Auditing:** Inspected the HTML tag attributes during theme toggles to confirm that the `class="dark"` attribute was appended or removed correctly.

## Key Questions Addressed
* **Why does grid layout require a `min-w-0` setting on tables?** Tables inside grid layouts can refuse to shrink below their contents, causing layouts to overflow; `min-w-0` overrides this default flex/grid behaviour.
* **What is the best way to prevent page theme flashes on load?** Initialize the React theme state using a callback function that immediately checks `localStorage` synchronously before rendering components.
