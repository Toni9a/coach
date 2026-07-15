export function ZoneChart({ intervals }: { intervals: number }) {
  return (
    <div className="mt-6">
      <div className="mb-1 text-center text-[10px] font-bold uppercase tracking-wider text-zone4">
        Zone 4
      </div>
      <div className="flex h-36 items-end overflow-hidden rounded-xl border border-border">
        <div className="h-[28%] flex-[1] bg-zone1" />
        <div className="relative flex h-full flex-[3] items-end gap-[2px] px-[2px]">
          <div className="absolute inset-x-0 bottom-0 h-[65%] bg-zone2" />
          {Array.from({ length: intervals }).map((_, i) => (
            <div key={i} className="relative z-10 h-[92%] flex-1 bg-zone4" />
          ))}
        </div>
        <div className="h-[28%] flex-[1.5] bg-zone1" />
      </div>
      <div className="mt-1.5 flex text-center text-[10px] font-semibold uppercase tracking-wide text-muted">
        <span className="flex-[1]">Zone 1</span>
        <span className="flex-[3]">Zone 2</span>
        <span className="flex-[1.5]">Zone 1</span>
      </div>
    </div>
  );
}
