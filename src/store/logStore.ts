import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkoutLog } from "../types";

export function logKey(date: string, workoutId: string): string {
  return `${date}:${workoutId}`;
}

export function emptyLog(date: string, workoutId: string): WorkoutLog {
  return {
    workoutId,
    date,
    completed: false,
    exercises: {},
    segments: {},
    syncedToStrava: false,
  };
}

interface LogState {
  logs: Record<string, WorkoutLog>;
  toggleExerciseDone: (date: string, workoutId: string, exerciseId: string) => void;
  setExerciseActuals: (
    date: string,
    workoutId: string,
    exerciseId: string,
    actuals: { actualSets?: number; actualReps?: string },
  ) => void;
  toggleSegmentDone: (date: string, workoutId: string, segmentId: string) => void;
  setSegmentActuals: (
    date: string,
    workoutId: string,
    segmentId: string,
    actuals: { actualZone?: string; actualDuration?: string },
  ) => void;
  toggleWorkoutComplete: (date: string, workoutId: string) => void;
  markSynced: (date: string, workoutId: string) => void;
}

export const useLogStore = create<LogState>()(
  persist(
    (set) => ({
      logs: {},

      toggleExerciseDone: (date, workoutId, exerciseId) =>
        set((state) => {
          const key = logKey(date, workoutId);
          const log = state.logs[key] ?? emptyLog(date, workoutId);
          const prev = log.exercises[exerciseId] ?? { done: false };
          return {
            logs: {
              ...state.logs,
              [key]: {
                ...log,
                exercises: {
                  ...log.exercises,
                  [exerciseId]: { ...prev, done: !prev.done },
                },
              },
            },
          };
        }),

      setExerciseActuals: (date, workoutId, exerciseId, actuals) =>
        set((state) => {
          const key = logKey(date, workoutId);
          const log = state.logs[key] ?? emptyLog(date, workoutId);
          const prev = log.exercises[exerciseId] ?? { done: false };
          return {
            logs: {
              ...state.logs,
              [key]: {
                ...log,
                exercises: {
                  ...log.exercises,
                  [exerciseId]: { ...prev, ...actuals },
                },
              },
            },
          };
        }),

      toggleSegmentDone: (date, workoutId, segmentId) =>
        set((state) => {
          const key = logKey(date, workoutId);
          const log = state.logs[key] ?? emptyLog(date, workoutId);
          const prev = log.segments[segmentId] ?? { done: false };
          return {
            logs: {
              ...state.logs,
              [key]: {
                ...log,
                segments: {
                  ...log.segments,
                  [segmentId]: { ...prev, done: !prev.done },
                },
              },
            },
          };
        }),

      setSegmentActuals: (date, workoutId, segmentId, actuals) =>
        set((state) => {
          const key = logKey(date, workoutId);
          const log = state.logs[key] ?? emptyLog(date, workoutId);
          const prev = log.segments[segmentId] ?? { done: false };
          return {
            logs: {
              ...state.logs,
              [key]: {
                ...log,
                segments: {
                  ...log.segments,
                  [segmentId]: { ...prev, ...actuals },
                },
              },
            },
          };
        }),

      toggleWorkoutComplete: (date, workoutId) =>
        set((state) => {
          const key = logKey(date, workoutId);
          const log = state.logs[key] ?? emptyLog(date, workoutId);
          return {
            logs: {
              ...state.logs,
              [key]: { ...log, completed: !log.completed },
            },
          };
        }),

      markSynced: (date, workoutId) =>
        set((state) => {
          const key = logKey(date, workoutId);
          const log = state.logs[key] ?? emptyLog(date, workoutId);
          return {
            logs: { ...state.logs, [key]: { ...log, syncedToStrava: true } },
          };
        }),
    }),
    { name: "coach-workout-logs" },
  ),
);

/** Stable read of a workout's log; falls back to a fresh empty log (not persisted) if none exists yet. */
export function useWorkoutLog(date: string, workoutId: string): WorkoutLog {
  const stored = useLogStore((s) => s.logs[logKey(date, workoutId)]);
  return stored ?? emptyLog(date, workoutId);
}
