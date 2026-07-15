# Coach

A personal training-plan web app: a weekly overview of lifts and runs, and
a per-day workout log where you check off exercises/run segments and record
what you actually did against the plan.

## Stack

React + TypeScript + Vite, styled with Tailwind CSS v4, routed with
React Router, animated with Framer Motion, and state persisted to
`localStorage` via Zustand.

## Develop

```bash
npm install
npm run dev
```

## Structure

- `src/data/plan.ts` — the weekly plan and workout definitions (edit here
  to change exercises, sets/reps, run structure, etc.)
- `src/store/logStore.ts` — per-date workout logs (completion checkboxes,
  actual sets/reps, actual run zones/duration), persisted locally
- `src/services/strava.ts` — Strava integration seam. Connecting and
  syncing currently simulate the round trip locally; wiring up the real
  OAuth flow and activity sync needs a backend (see comments in that file)
- `src/pages` / `src/components` — the week overview and day/workout log UI

## Roadmap

- Backend + OAuth for real Strava sync
- Historical log view across past weeks
