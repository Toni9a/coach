const TYPE_STYLES: Record<string, string> = {
  lift: "bg-surface-2 text-ink border-border",
  run: "bg-transparent text-zone2 border-zone2/40",
};

export function Tag({
  label,
  type,
  done,
}: {
  label: string;
  type: "lift" | "run";
  done?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${TYPE_STYLES[type]} ${
        done ? "opacity-60" : ""
      }`}
    >
      {done && <span className="text-accent">✓</span>}
      {label}
    </span>
  );
}
