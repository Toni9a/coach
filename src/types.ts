export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface Exercise {
  id: string;
  name: string;
  plannedSets: number;
  plannedReps: string;
  supersetGroup?: string;
}

export interface CoreBlock {
  id: string;
  label: string;
  plannedValue: string;
}

export interface LiftWorkout {
  id: string;
  type: "lift";
  day: DayKey;
  tag: string;
  exercises: Exercise[];
  core?: CoreBlock;
}

export interface RunSegment {
  id: string;
  label: string;
  plannedZone: "Zone 1" | "Zone 2" | "Zone 3" | "Zone 4";
}

export interface RunWorkout {
  id: string;
  type: "run";
  day: DayKey;
  tag: string;
  warmup: RunSegment[];
  mainset: RunSegment[];
  cooldown: RunSegment[];
  chart?: { intervals: number };
}

export type Workout = LiftWorkout | RunWorkout;

export interface DayPlan {
  day: DayKey;
  label: string;
  workoutIds: string[];
}

export interface ExerciseLog {
  done: boolean;
  actualSets?: number;
  actualReps?: string;
}

export interface SegmentLog {
  done: boolean;
  actualZone?: string;
  actualDuration?: string;
}

export interface WorkoutLog {
  workoutId: string;
  date: string;
  completed: boolean;
  exercises: Record<string, ExerciseLog>;
  segments: Record<string, SegmentLog>;
  syncedToStrava: boolean;
}
