import type { RunSegment, RunWorkout } from "../types";
import { useLogStore, useWorkoutLog } from "../store/logStore";
import { ZoneChart } from "./ZoneChart";

const ZONES = ["Zone 1", "Zone 2", "Zone 3", "Zone 4"];

function SegmentRow({
  segment,
  date,
  workoutId,
}: {
  segment: RunSegment;
  date: string;
  workoutId: string;
}) {
  const segLog = useWorkoutLog(date, workoutId).segments[segment.id];
  const toggleSegmentDone = useLogStore((s) => s.toggleSegmentDone);
  const setSegmentActuals = useLogStore((s) => s.setSegmentActuals);

  return (
    <div className="grid grid-cols-[auto_1fr_5rem_5.5rem] items-center gap-2 border-b border-border/60 py-2.5 last:border-0">
      <input
        type="checkbox"
        checked={segLog?.done ?? false}
        onChange={() => toggleSegmentDone(date, workoutId, segment.id)}
        className="h-4 w-4 shrink-0 accent-[var(--color-accent)]"
      />
      <span className={`text-sm ${segLog?.done ? "text-muted line-through" : "text-ink"}`}>
        {segment.label}
        <span className="ml-2 text-xs text-muted">{segment.plannedZone}</span>
      </span>
      <input
        type="text"
        placeholder="actual"
        value={segLog?.actualDuration ?? ""}
        onChange={(e) => setSegmentActuals(date, workoutId, segment.id, { actualDuration: e.target.value })}
        className="w-full rounded-md border border-border bg-surface-2 px-2 py-1 text-center text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none"
      />
      <select
        value={segLog?.actualZone ?? segment.plannedZone}
        onChange={(e) => setSegmentActuals(date, workoutId, segment.id, { actualZone: e.target.value })}
        className="w-full rounded-md border border-border bg-surface-2 px-1 py-1 text-center text-xs font-semibold text-ink focus:border-accent focus:outline-none"
      >
        {ZONES.map((z) => (
          <option key={z} value={z}>
            {z}
          </option>
        ))}
      </select>
    </div>
  );
}

function Section({
  title,
  segments,
  date,
  workoutId,
}: {
  title: string;
  segments: RunSegment[];
  date: string;
  workoutId: string;
}) {
  if (segments.length === 0) return null;
  return (
    <div className="mt-4 first:mt-0">
      <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted">{title}</div>
      <div className="grid grid-cols-[auto_1fr_5rem_5.5rem] gap-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted/70">
        <span />
        <span>Planned</span>
        <span className="text-center">Actual</span>
        <span className="text-center">Zone</span>
      </div>
      {segments.map((seg) => (
        <SegmentRow key={seg.id} segment={seg} date={date} workoutId={workoutId} />
      ))}
    </div>
  );
}

export function RunLog({ workout, date }: { workout: RunWorkout; date: string }) {
  return (
    <div>
      <Section title="Warm Up" segments={workout.warmup} date={date} workoutId={workout.id} />
      <Section title="Main Set" segments={workout.mainset} date={date} workoutId={workout.id} />
      <Section title="Cool Down" segments={workout.cooldown} date={date} workoutId={workout.id} />
      {workout.chart && <ZoneChart intervals={workout.chart.intervals} />}
    </div>
  );
}
