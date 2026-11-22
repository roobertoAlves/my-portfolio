# my-portfolio

Personal portfolio: React + TypeScript + Vite + Tailwind, routing with wouter, data via TanStack Query.

## Structure

- `src/features/<section>/` — page sections: hero, about, experience, education, projects, skills, contact
- `src/app/` — `Providers.tsx`, `Layout.tsx`, `DataProvider.tsx`
- `src/components/`, `src/hooks/`, `src/lib/`, `src/contexts/`, `src/data/`, `src/locales/` (i18n), `src/pages/`
- `public/img/` — image assets

## Commands

- `npm run dev` · `npm run check` (tsc) · `npm test` (vitest) · `npm run lint` · `npm run format`
- Note: `npm run build` and `npm run db:push` reference `server/_core/index.ts` and drizzle, which don't exist in this repo (template leftovers). Use `npx vite build` for a frontend-only build, or confirm with the user before touching these scripts.

## Rules

- Prettier config in `.prettierrc` (double quotes, semicolons, LF); ESLint in `eslint.config.js`.
- Text visible to users goes through `src/locales`, not hard-coded strings.
- Keep each section self-contained inside its feature folder.
