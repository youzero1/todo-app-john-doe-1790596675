---
status: pending
title: Simple Personal Todo App
---

The project is currently empty (only README.md and env.example). Everything below is created from scratch.

1. Scaffold the project root: create `package.json` (ESM, npm, type: module) with React, React DOM, `@tanstack/react-router`, and dev deps `vite`, `@vitejs/plugin-react`, `typescript`, `@tanstack/router-plugin`, `@tailwindcss/vite`. Add `dev`, `build`, `preview` scripts. Expected outcome: `npm install` succeeds.

2. Create `vite.config.ts` registering the TanStack Router plugin (file-based routes from `src/routes`, generating `src/routeTree.gen.ts`), the React plugin, and the Tailwind CSS v4 plugin. Configure the `@/` alias to `src/`. Expected outcome: dev server starts and routes auto-generate.

3. Create `tsconfig.json` (and `tsconfig.node.json` if needed) with strict mode, bundler module resolution, JSX react-jsx, and the `@/*` → `src/*` path mapping matching the Vite alias. Expected outcome: no TS path errors.

4. Create `index.html` at the root with a `#root` div and a module script pointing at `src/main.tsx`. Set a sensible page title. Expected outcome: app shell loads.

5. Create `src/styles/global.css` whose first line is exactly `@import "tailwindcss";`. Add nothing else unless a custom theme token is needed. Expected outcome: Tailwind utilities available app-wide.

6. Create `src/main.tsx`: import `./styles/global.css` once, build the router from the generated `routeTree.gen.ts`, and render `RouterProvider` into `#root` inside StrictMode. Expected outcome: app boots with routing active.

7. Create `src/routes/__root.tsx` as the app shell: centered max-width container, page background, heading ("Todos"), and an `Outlet`. Expected outcome: consistent layout wrapper for the single route.

8. Create `src/types/todo.ts` defining the Todo shape: `id` (string), `title` (string), `completed` (boolean), `dueDate` (string in `YYYY-MM-DD` or null), `createdAt`. Also export the filter union type: `all | active | completed`. Expected outcome: shared types available via `@/types/todo`.

9. Create `src/lib/date.ts` with pure helpers: parse a `YYYY-MM-DD` value to a local date, compare against today, and return a due-date status of `overdue`, `today`, `upcoming`, or `none`, plus a short human-readable label (e.g. "Today", "Tomorrow", "Mar 4", "2 days overdue"). Expected outcome: date logic is testable and isolated from components.

10. Create `src/hooks/useTodos.ts` holding todo state with `useState` (in-memory only) and exposing `todos`, `addTodo(title, dueDate)`, `toggleTodo(id)`, `deleteTodo(id)`, and derived counts (total, active, completed). Generate ids with `crypto.randomUUID()`. Guard against empty/whitespace-only titles. Optional easy upgrade, not required now: persist to `localStorage` by seeding initial state from storage and syncing on change inside this hook — no component changes needed.

11. Create `src/components/TodoForm.tsx`: a controlled form with a text input for the title, an optional `<input type="date">` for the due date, and a submit button. Clears both fields on submit and refocuses the text input. Disables submit when the title is blank. Expected outcome: new tasks can be added with or without a due date.

12. Create `src/components/DueDateBadge.tsx`: a small pill rendering the due-date label, styled by status from `@/lib/date` — red for overdue, amber for today, neutral for upcoming, hidden when there is no due date. Muted/struck styling when the parent task is completed. Expected outcome: due dates read at a glance.

13. Create `src/components/TodoItem.tsx`: a row with a checkbox, the title (line-through and dimmed when completed), the `DueDateBadge`, and a delete button that appears on hover/focus. Ensure keyboard accessibility (labelled checkbox, accessible delete button name). Expected outcome: each task can be completed or removed.

14. Create `src/components/TodoList.tsx`: renders the filtered todos as a list of `TodoItem`s with dividers. Expected outcome: ordered, readable task list.

15. Create `src/components/EmptyState.tsx`: friendly message varying by active filter — no tasks yet, nothing active, or nothing completed — with a short hint to add the first task. Expected outcome: the app never shows a blank panel.

16. Create `src/components/FilterTabs.tsx`: three segmented buttons for all/active/completed, with the selected tab visually highlighted and `aria-pressed` set. Expected outcome: cheap filtering UI.

17. Create `src/routes/index.tsx` as the single main route: use `useTodos`, hold the active filter in local state, and compose `TodoForm`, `FilterTabs`, `TodoList` (or `EmptyState` when the filtered list is empty), and a footer line showing counts (e.g. "3 of 5 remaining"). Expected outcome: fully working app at `/`.

18. Polish pass: card surface with rounded corners and subtle border/shadow, generous spacing, readable typography, hover/focus-visible states on all interactive elements, and a responsive layout that works down to small phone widths. Expected outcome: clean, pleasant UI.

19. Add `.gitignore` covering `node_modules`, `dist`, and `src/routeTree.gen.ts` if preferred, then run a type check and a production build to confirm no errors. Expected outcome: app builds cleanly and runs in the dev server.
