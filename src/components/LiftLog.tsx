import type { LiftWorkout } from "../types";
import { useLogStore, useWorkoutLog } from "../store/logStore";

export function LiftLog({ workout, date }: { workout: LiftWorkout; date: string }) {
  const log = useWorkoutLog(date, workout.id);
  const toggleExerciseDone = useLogStore((s) => s.toggleExerciseDone);
  const setExerciseActuals = useLogStore((s) => s.setExerciseActuals);

  let lastGroup: string | undefined;

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[auto_1fr_3.5rem_4rem] items-center gap-2 pb-2 text-[11px] font-bold uppercase tracking-wide text-muted">
        <span />
        <span>Exercise</span>
        <span className="text-center">Sets</span>
        <span className="text-center">Reps</span>
      </div>

      {workout.exercises.map((ex) => {
        const showGroupLabel = ex.supersetGroup && ex.supersetGroup !== lastGroup;
        lastGroup = ex.supersetGroup;
        const exLog = log.exercises[ex.id];

        return (
          <div key={ex.id}>
            {showGroupLabel && (
              <div className="pb-1 pt-3 text-[11px] font-bold uppercase tracking-wide text-accent">
                Superset
              </div>
            )}
            <label className="grid grid-cols-[auto_1fr_3.5rem_4rem] items-center gap-2 border-b border-border/60 py-2.5 last:border-0">
              <input
                type="checkbox"
                checked={exLog?.done ?? false}
                onChange={() => toggleExerciseDone(date, workout.id, ex.id)}
                className="h-4 w-4 shrink-0 accent-[var(--color-accent)]"
              />
              <span className={`text-sm ${exLog?.done ? "text-muted line-through" : "text-ink"}`}>
                {ex.name}
              </span>
              <input
                type="number"
                inputMode="numeric"
                placeholder={String(ex.plannedSets)}
                value={exLog?.actualSets ?? ""}
                onChange={(e) =>
                  setExerciseActuals(date, workout.id, ex.id, {
                    actualSets: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
                className="w-full rounded-md border border-border bg-surface-2 px-1.5 py-1 text-center text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none"
              />
              <input
                type="text"
                placeholder={ex.plannedReps}
                value={exLog?.actualReps ?? ""}
                onChange={(e) =>
                  setExerciseActuals(date, workout.id, ex.id, { actualReps: e.target.value })
                }
                className="w-full rounded-md border border-border bg-surface-2 px-1.5 py-1 text-center text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none"
              />
            </label>
          </div>
        );
      })}

      {workout.core && (
        <label className="mt-2 flex items-center gap-2 border-t border-border pt-3">
          <input
            type="checkbox"
            checked={log.exercises[workout.core.id]?.done ?? false}
            onChange={() => toggleExerciseDone(date, workout.id, workout.core!.id)}
            className="h-4 w-4 shrink-0 accent-[var(--color-accent)]"
          />
          <span
            className={`text-sm font-semibold ${
              log.exercises[workout.core.id]?.done ? "text-muted line-through" : "text-ink"
            }`}
          >
            {workout.core.label}
          </span>
          <span className="ml-auto text-xs text-muted">{workout.core.plannedValue}</span>
        </label>
      )}
    </div>
  );
}
