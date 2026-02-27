# `<solar-logo-ticker>` Web Component

A smooth, infinite-scrolling logo ticker with fade-masked edges. Displays partner or client logos in a continuous loop with configurable speed and direction.

## Quick Start

```bash
npm install
npm run build
```

This produces `dist/solar-logo-ticker.js` — a single ES module that self-registers the `<solar-logo-ticker>` custom element.

## Development

```bash
npm run dev
```

Opens `demo.html` with hot reload via Vite.

## Usage

```html
<script type="module" src="dist/solar-logo-ticker.js"></script>

<solar-logo-ticker accent="#8C52FF"></solar-logo-ticker>
```

## Attributes

| Attribute | Description |
|-----------|-------------|
| `accent` | Hex color string for the accent theme |
| `variant` | Component variant/mode |

## Accessibility

- **`prefers-reduced-motion`**: Automatically falls back to a static version.
- **Keyboard navigation**: Interactive elements are focusable.
- **ARIA labels**: All interactive elements are labeled.

## Architecture

- **Shadow DOM** encapsulates all styles — no CSS leaks in or out.
- Single ES module entry point.

## Build Output

```
dist/
  solar-logo-ticker.js    ← single ES module entry point
```
