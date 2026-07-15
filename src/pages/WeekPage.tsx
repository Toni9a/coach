import { WEEK_PLAN } from "../data/plan";
import { DayCard } from "../components/DayCard";

export function WeekPage() {
  return (
    <div className="mx-auto max-w-lg px-5 pb-16 pt-8">
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
  );
}
