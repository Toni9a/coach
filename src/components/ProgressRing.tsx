interface ProgressRingProps {
  value: number;
  total: number;
  size?: number;
}

export function ProgressRing({ value, total, size = 34 }: ProgressRingProps) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = total > 0 ? value / total : 0;
  const offset = circumference * (1 - pct);
  const done = total > 0 && value === total;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeOpacity={0.18}
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={done ? "var(--color-highlight)" : "var(--color-ink)"}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-300"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-ink/70">
        {total > 0 ? `${value}/${total}` : ""}
      </span>
    </div>
  );
}
