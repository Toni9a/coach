import { Link, Navigate, useParams } from "react-router-dom";
import { WEEK_PLAN, WORKOUTS } from "../data/plan";
import type { DayKey } from "../types";
import { dateForDayInCurrentWeek, formatDateLabel } from "../lib/dates";
import { WorkoutCard } from "../components/WorkoutCard";

export function DayPage() {
  const { day } = useParams<{ day: string }>();
  const plan = WEEK_PLAN.find((p) => p.day === day);

  if (!plan) return <Navigate to="/" replace />;

  const date = dateForDayInCurrentWeek(plan.day as DayKey);
  const workouts = plan.workoutIds.map((id) => WORKOUTS[id]);

  return (
    <div className="mx-auto max-w-lg px-5 pb-16 pt-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted transition hover:text-ink"
      >
        ← Full Week
      </Link>

      <div className="mb-6 text-center">
        <h1 className="font-display text-4xl tracking-wide text-ink">{plan.label}</h1>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
          {formatDateLabel(date)}
        </p>
      </div>

      {workouts.length === 0 ? (
        <p className="text-center text-sm text-muted">Rest day. Recover.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} date={date} />
          ))}
        </div>
      )}
    </div>
  );
}
