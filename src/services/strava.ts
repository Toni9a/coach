import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkoutLog } from "../types";

/**
 * Strava integration stub.
 *
 * Real Strava sync needs OAuth2 (client id/secret can't live in the
 * frontend) plus a backend to hold the athlete's refresh token and call
 * the Strava API on their behalf. None of that exists yet — this module
 * is the seam where it plugs in later:
 *
 *   1. `connect()` -> redirect to `${API_BASE}/auth/strava/start`,
 *      backend completes the OAuth handshake and redirects back with a
 *      short-lived session.
 *   2. `syncWorkout()` -> POST the completed log to
 *      `${API_BASE}/strava/activities`, backend maps it to a Strava
 *      activity via the athlete's stored token.
 *
 * Until that backend exists, both calls simulate latency and resolve
 * locally so the UI (connect button, per-workout sync button) is fully
 * wired and only needs its fetch calls swapped in.
 */

interface StravaState {
  connected: boolean;
  athleteName: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useStravaStore = create<StravaState>()(
  persist(
    (set) => ({
      connected: false,
      athleteName: null,
      connect: async () => {
        // TODO: window.location.href = `${API_BASE}/auth/strava/start`
        await new Promise((r) => setTimeout(r, 600));
        set({ connected: true, athleteName: "You" });
      },
      disconnect: () => set({ connected: false, athleteName: null }),
    }),
    { name: "coach-strava-connection" },
  ),
);

export async function syncWorkoutToStrava(
  _log: WorkoutLog,
  _workoutName: string,
): Promise<{ ok: true }> {
  // TODO: POST to `${API_BASE}/strava/activities` once the backend exists.
  await new Promise((r) => setTimeout(r, 800));
  return { ok: true };
}
