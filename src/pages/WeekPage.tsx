import { WEEK_PLAN, WORKOUTS } from "../data/plan";
import { WORKOUT_BACKGROUNDS } from "../data/backgrounds";
import { dateForDayInCurrentWeek, isToday } from "../lib/dates";
import { DayCard } from "../components/DayCard";

function todaysBackground(): string | undefined {
  const todayPlan = WEEK_PLAN.find((p) => isToday(dateForDayInCurrentWeek(p.day)));
  const firstWorkout = todayPlan?.workoutIds[0];
  if (!firstWorkout) return undefined;
  return WORKOUT_BACKGROUNDS[WORKOUTS[firstWorkout].tag];
}

export function WeekPage() {
  const bg = todaysBackground();

  return (
    <div className="relative">
      {bg && (
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 h-[45vh] w-full object-cover object-bottom opacity-[0.08] grayscale"
        />
      )}

      <div className="relative mx-auto max-w-lg px-5 pb-16 pt-8">
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl tracking-wide text-ink">The Full Week</h1>
          <p className="mt-2 text-sm font-semibold text-muted">4 lifts · 5 runs · 1 long run</p>
          <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-muted">
            Run the hard days hard. Keep the easy days easy. Do not turn every session into a test.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {WEEK_PLAN.map((plan, i) => (
            <DayCard key={plan.day} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
