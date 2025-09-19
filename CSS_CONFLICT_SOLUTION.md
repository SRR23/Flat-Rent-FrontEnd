# CSS Conflict Solution - Tailwind CSS vs Bootstrap

## Problem Identified
When importing `./index.css` in `main.jsx`, the design elements were being hidden or cut off.

## Root Cause
- **Tailwind CSS v4** was installed and configured in Vite
- `src/index.css` contained `@import "tailwindcss";`
- Tailwind's **preflight** (CSS reset/normalize) was conflicting with existing Bootstrap styles
- The project uses Bootstrap-based styling in `public/css/style.css` and `public/css/main.css`

## Solution Applied
Created `tailwind.config.js` with `preflight: false` to disable Tailwind's CSS reset:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Disable Tailwind's preflight (CSS reset) to prevent conflicts with Bootstrap
  corePlugins: {
    preflight: false,
  },
}
```

## Files Modified
1. `tailwind.config.js` - Created with preflight disabled
2. `src/main.jsx` - Uncommented `import './index.css'`

## Result
- Tailwind CSS utilities are now available without conflicting with Bootstrap
- Existing Bootstrap-based design remains intact
- Both CSS frameworks can coexist peacefully

## Testing
Run the development server to verify the design is no longer cut off:
```bash
npm run dev
```

## Alternative Solutions (if needed)
1. Use Tailwind's `@layer` directive to control specificity
2. Import only specific Tailwind modules instead of the full framework
3. Use CSS custom properties to override conflicting styles