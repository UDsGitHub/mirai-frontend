/** Maps a 0–10 rating to a Tailwind text color class. */
export function getColorByRating(rating: number): string {
  if (rating >= 8) return "text-teal-400"
  if (rating >= 6) return "text-yellow-400"
  return "text-red-400"
}
