import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { DayPlan } from "../types";
import { WORKOUTS } from "../data/plan";
import { useLogStore } from "../store/logStore";
import { dateForDayInCurrentWeek, formatDateLabel, isToday } from "../lib/dates";
import { workoutTaskCount, workoutTasksDone } from "../lib/progress";
import { Tag } from "./Tag";
import { ProgressRing } from "./ProgressRing";

export function DayCard({ plan, index }: { plan: DayPlan; index: number }) {
  const logs = useLogStore((s) => s.logs);
  const date = dateForDayInCurrentWeek(plan.day);
  const workouts = plan.workoutIds.map((id) => WORKOUTS[id]);

  let total = 0;
  let done = 0;
  for (const w of workouts) {
    const log = logs[`${date}:${w.id}`];
    total += workoutTaskCount(w);
    if (log) done += workoutTasksDone(w, log);
  }

  const today = isToday(date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
    >
      <Link
        to={`/day/${plan.day}`}
        className="group flex items-start gap-4 border-b border-border/15 py-3 transition hover:opacity-70"
      >
        <div className="flex w-32 shrink-0 flex-col pt-1">
          <span className="font-display text-xl leading-none tracking-wide whitespace-nowrap text-ink">
            {plan.label.toUpperCase()}
          </span>
          <span className={`mt-1 text-[11px] font-semibold uppercase tracking-wide ${today ? "text-highlight" : "text-muted"}`}>
            {today ? "Today" : formatDateLabel(date)}
          </span>
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-2 pt-0.5">
          {workouts.length === 0 ? (
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Rest day</span>
          ) : (
            workouts.map((w) => {
              const log = logs[`${date}:${w.id}`];
              const wTotal = workoutTaskCount(w);
              const wDone = log ? workoutTasksDone(w, log) : 0;
              return <Tag key={w.id} label={w.tag} done={wTotal > 0 && wDone === wTotal} />;
            })
          )}
        </div>

        {total > 0 && <ProgressRing value={done} total={total} />}
      </Link>
    </motion.div>
  );
}
