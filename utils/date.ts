export function getTimeOfDay(): string {
  const now = new Date()
  const hours = now.getHours()
  if (hours < 12) {
    return "Morning"
  } else if (hours < 18) {
    return "Afternoon"
  } else {
    return "Evening"
  }
}
