import type { DayKey } from "../types";

const DAY_INDEX: Record<DayKey, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0,
};

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** ISO date (yyyy-mm-dd) for `day` in the Monday-Sunday week containing `reference`. */
export function dateForDayInCurrentWeek(day: DayKey, reference = new Date()): string {
  const ref = new Date(reference);
  ref.setHours(0, 0, 0, 0);
  const refDow = ref.getDay();
  const mondayOffset = refDow === 0 ? -6 : 1 - refDow;
  const monday = new Date(ref);
  monday.setDate(ref.getDate() + mondayOffset);

  const targetDow = DAY_INDEX[day];
  const deltaFromMonday = targetDow === 0 ? 6 : targetDow - 1;
  const target = new Date(monday);
  target.setDate(monday.getDate() + deltaFromMonday);

  return toISODate(target);
}

export function formatDateLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function isToday(iso: string): boolean {
  return iso === toISODate(new Date());
}
