const base = import.meta.env.BASE_URL;

/** Faded ASCII-art background per workout tag. Missing entries (e.g. Lower
 * Strength) just render without a background until an image is added. */
export const WORKOUT_BACKGROUNDS: Record<string, string> = {
  "Upper Strength": `${base}bg/gorilla.webp`,
  "Interval Run": `${base}bg/cheetah.webp`,
  "Progressive Run": `${base}bg/horse.webp`,
  "Long Run": `${base}bg/wolf.webp`,
  Run: `${base}bg/deer.webp`,
};
