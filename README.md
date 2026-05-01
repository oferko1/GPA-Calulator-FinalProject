# GPA Calculator

An interactive single-page GPA calculator built with vanilla HTML, CSS, and JavaScript. Add courses, see your cumulative GPA update live, and have your data persist across page reloads via `localStorage`.

## Features

- Add courses with name, credit hours, and letter grade
- Live cumulative GPA on every change (weighted by credits)
- Delete individual courses
- Summary stats: total credits, total quality points, academic standing
- Latin-honors-style standing tiers (Summa, Magna, Cum Laude, Good, Satisfactory, Probation)
- Persistent storage. Refresh or close the tab and your courses are still there
- Responsive layout that wraps on narrow viewports

## Tech Stack

This project uses each of the five required elements:

| Element     | Where it appears                                                                 |
|-------------|----------------------------------------------------------------------------------|
| HTML        | Semantic structure (`<header>`, `<main>`, `<section>`, `<footer>`)               |
| CSS         | Custom properties, typography, hover/focus states, design tokens                 |
| Flexbox     | All layout — page, header split, form rows, course rows, footer stats            |
| JavaScript  | State management, GPA calculation, DOM rendering, event handling, localStorage   |
| HTML Forms  | `<form>` with text/number inputs, `<select>`, validation, submit/reset buttons   |

No frameworks, no build step, no dependencies beyond two Google Fonts.

## File Structure

```
gpa-calculator.html    Single self-contained file (HTML + CSS + JS)
README.md              This file
ALGORITHM.md           Pseudocode and algorithm description
```

## How to Run

1. Download `gpa-calculator.html`
2. Double-click to open it in any modern browser

That's it. No server, no install.

## Usage

1. Type a course name (e.g. `COSC 365`)
2. Enter credit hours (0.5–12, in 0.5 increments)
3. Pick a letter grade from the dropdown
4. Click **Add Course**
5. The cumulative GPA, total credits, quality points, and standing all update instantly
6. Click the **×** on any course row to remove it

## Grade Scale

Standard 4.0 scale with plus/minus grades:

| Grade | Points |    | Grade | Points |
|-------|--------|----|-------|--------|
| A     | 4.0    |    | C+    | 2.3    |
| A−    | 3.7    |    | C     | 2.0    |
| B+    | 3.3    |    | C−    | 1.7    |
| B     | 3.0    |    | D+    | 1.3    |
| B−    | 2.7    |    | D     | 1.0    |
|       |        |    | F     | 0.0    |

## GPA Formula

Cumulative GPA is a weighted average — courses with more credits count more:

```
GPA = Σ(credits × grade_points) / Σ(credits)
```

The numerator (Σ credits × grade points) is also called **quality points**.

## Persistence

Courses are saved to the browser's `localStorage` under the key `gpa-calculator:courses`. The data is JSON-encoded and survives reloads, browser restarts, and tab closes. To clear it, open DevTools → Application → Local Storage and delete the entry, or use the browser's "Clear site data" option.

`localStorage` is per-browser and per-domain, so courses saved in Chrome won't appear in Firefox, and opening the file from a different folder may use separate storage.

## Browser Support

Any browser from the last several years. Uses CSS custom properties, Flexbox, ES6 (`const`, arrow functions, template literals, `FormData`), and `localStorage` — all universally supported.

## Authors

Owen Ferko, Jack MacMurdo — Computer Science, Indiana University of Pennsylvania