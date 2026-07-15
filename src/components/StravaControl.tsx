import { useState } from "react";
import { useStravaStore } from "../services/strava";

export function StravaControl() {
  const { connected, athleteName, connect, disconnect } = useStravaStore();
  const [connecting, setConnecting] = useState(false);

  if (connected) {
    return (
      <button
        onClick={disconnect}
        className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-[var(--color-strava)] hover:text-ink"
        title="Disconnect Strava"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-strava)]" />
        Strava · {athleteName}
      </button>
    );
  }

  return (
    <button
      onClick={async () => {
        setConnecting(true);
        await connect();
        setConnecting(false);
      }}
      disabled={connecting}
      className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-[var(--color-strava)] hover:text-ink disabled:opacity-60"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-border" />
      {connecting ? "Connecting…" : "Connect Strava"}
    </button>
  );
}
