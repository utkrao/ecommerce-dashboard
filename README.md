# SaaS Dashboard – React + Vite

A pixel-focused SaaS analytics dashboard built with React and Vite. It ships two primary screens – **Home** and **Order List** – plus dark/light theming, motion design, and productivity tooling such as filtering, sorting, searching, and pagination.

## Live Demo

Deploy on your preferred host (Vercel/Netlify/GitHub Pages) and drop the link here.

```
https://your-deployment-url.example
```

## Getting Started

```bash
# install dependencies
npm install

# run locally with hot reload
npm run dev

# type-checks/lint (optional)
npm run lint

# production build
npm run build

# preview the production build locally
npm run preview
```

## Key Features

- **Home dashboard** – KPI cards, animated line/bar/donut charts, location heatmap and tabular data with responsive layout.
- **Order list view** – interactive data grid with search, status filtering, sortable columns, animated row transitions, selection, and paginated footer.
- **Theming & motion** – smooth dark/light toggle persisted to localStorage, framer-motion powered micro-interactions, and glassmorphism inspired surfaces.
- **Accessibility-minded** – semantic structure, focus states, keyboard-friendly controls, and reduced-motion fallbacks via CSS variables.

## Tech Stack

- React 19 + Vite
- React Router DOM
- Framer Motion for animation
- Recharts for data visualisation
- Lucide React icon set
- Modern CSS (custom properties, color-mix, responsive grid)

## Project Structure

```
src/
  components/
    common/        // shared UI primitives (status badge, etc.)
    dashboard/     // analytics widgets and charts
    layout/        // sidebar, header, shell
  data/            // mock data sets for dashboards & orders
  pages/           // routed screens (Home, Orders)
  styles/          // global + page-specific stylesheets
  theme/           // theme context provider
```

## Visual Tweaks

- **Forecast vs Actuals**: stacked Recharts bars highlight the delta between actual results and projections, matching the handoff reference.
- **Location card**: bespoke SVG map background with positioned markers and softened progress bars to mirror the provided design exactly.

## Design Decisions & Notes

- **CSS variables + color tokens** keep light/dark parity and simplify theming.
- **Framer Motion** powers card hover states, table row reveals, and mobile sidebar transitions for subtle depth without overwhelming the UI.
- **Data modules** encapsulate mock content so swapping in real APIs later requires minimal refactors.
- **Charts** favour declarative Recharts components with custom tooltips to mirror the Figma handoff precisely.
- **Responsive grid** adapts layouts down to tablet/mobile via CSS grid breakpoints while preserving dashboard hierarchy.

## Future Enhancements

1. Wire real API/data fetching and optimistic state updates for table mutations.
2. Add comprehensive test coverage (React Testing Library / Playwright) for filters, pagination, and theming logic.
3. Introduce role-based navigation + user profile drawer interactions.
4. Optimise bundle size with dynamic `import()` splits for charting libraries when scaling to more routes.

## Deployment Tips

1. Create a production build: `npm run build`.
2. Deploy the contents of the `dist/` folder to Vercel/Netlify/GitHub Pages.
3. Update the **Live Demo** section above with the deployed URL.

Enjoy the dashboard, and feel free to adapt the data models or styling tokens to match your own product branding.

