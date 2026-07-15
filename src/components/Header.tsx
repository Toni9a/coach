import { Link } from "react-router-dom";
import { StravaControl } from "./StravaControl";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-center justify-between px-5 py-4">
        <Link
          to="/"
          className="font-display text-xl tracking-wide text-ink"
        >
          COACH
        </Link>
        <StravaControl />
      </div>
    </header>
  );
}
