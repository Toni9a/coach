import type { Workout, WorkoutLog } from "../types";

export function workoutTaskCount(workout: Workout): number {
  if (workout.type === "lift") {
    return workout.exercises.length + (workout.core ? 1 : 0);
  }
  return workout.warmup.length + workout.mainset.length + workout.cooldown.length;
}

export function workoutTasksDone(workout: Workout, log: WorkoutLog): number {
  if (workout.type === "lift") {
    const exerciseDone = workout.exercises.filter((e) => log.exercises[e.id]?.done).length;
    const coreDone = workout.core && log.exercises[workout.core.id]?.done ? 1 : 0;
    return exerciseDone + coreDone;
  }
  const allSegments = [...workout.warmup, ...workout.mainset, ...workout.cooldown];
  return allSegments.filter((s) => log.segments[s.id]?.done).length;
}
