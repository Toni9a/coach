import { useState } from "react";
import { motion } from "framer-motion";
import type { Workout } from "../types";
import { useLogStore, useWorkoutLog } from "../store/logStore";
import { syncWorkoutToStrava } from "../services/strava";
import { useStravaStore } from "../services/strava";
import { workoutTaskCount, workoutTasksDone } from "../lib/progress";
import { WORKOUT_BACKGROUNDS } from "../data/backgrounds";
import { Tag } from "./Tag";
import { ProgressRing } from "./ProgressRing";
import { LiftLog } from "./LiftLog";
import { RunLog } from "./RunLog";

export function WorkoutCard({ workout, date }: { workout: Workout; date: string }) {
  const log = useWorkoutLog(date, workout.id);
  const toggleWorkoutComplete = useLogStore((s) => s.toggleWorkoutComplete);
  const markSynced = useLogStore((s) => s.markSynced);
  const stravaConnected = useStravaStore((s) => s.connected);
  const [syncing, setSyncing] = useState(false);

  const total = workoutTaskCount(workout);
  const done = workoutTasksDone(workout, log);
  const bg = WORKOUT_BACKGROUNDS[workout.tag];

  const handleSync = async () => {
    setSyncing(true);
    await syncWorkoutToStrava(log, workout.tag);
    markSynced(date, workout.id);
    setSyncing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5"
    >
      {bg && (
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full object-cover object-bottom opacity-[0.28] grayscale contrast-125"
        />
      )}

      <div className="relative mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Tag label={workout.tag} type={workout.type} />
          <ProgressRing value={done} total={total} size={28} />
        </div>
        <button
          onClick={() => toggleWorkoutComplete(date, workout.id)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
            log.completed
              ? "bg-accent text-accent-ink"
              : "border border-border bg-surface-2 text-muted hover:text-ink"
          }`}
        >
          {log.completed ? "Completed ✓" : "Mark complete"}
        </button>
      </div>

      <div className="relative">
        {workout.type === "lift" ? (
          <LiftLog workout={workout} date={date} />
        ) : (
          <RunLog workout={workout} date={date} />
        )}

        {log.completed && (
          <div className="mt-4 flex items-center justify-end border-t border-border pt-4">
            {log.syncedToStrava ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-strava)]" />
                Synced to Strava
              </span>
            ) : (
              <button
                onClick={handleSync}
                disabled={syncing || !stravaConnected}
                title={stravaConnected ? undefined : "Connect Strava to sync"}
                className="flex items-center gap-1.5 rounded-full border border-[var(--color-strava)]/50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-strava)] transition hover:bg-[var(--color-strava)]/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {syncing ? "Syncing…" : "Sync to Strava"}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
