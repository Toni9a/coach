export function Tag({
  label,
  done,
}: {
  label: string;
  type?: "lift" | "run";
  done?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-2 border-border bg-bg px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ink ${
        done ? "opacity-50" : ""
      }`}
    >
      {done && <span>✓</span>}
      {label}
    </span>
  );
}
