export function getTimeSince(startDate: Date) {
  const now = new Date().getTime();
  const start = startDate.getTime();

  const diff = Math.max(now - start, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const totalHours = getTotalHoursSince(startDate);

  return { days, hours, minutes, seconds, totalHours };
}

export function getTotalHoursSince(startDate: Date) {
  const now = Date.now();
  const start = startDate.getTime();

  const diff = Math.max(now - start, 0);

  const totalHours = Math.floor(diff / (1000 * 60 * 60));

  return totalHours;
}

export function secondsToHours(seconds: number): number {
  return Math.floor(seconds / 3600);
}

export function hoursToDay(hours: number): number {
  return Math.floor(hours / 24);
}

export function formatHours(hours: number): string {
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;

  if (days > 0 && remHours > 0) return `${days}d ${remHours}h`;
  if (days > 0) return `${days}d`;
  return `${hours}h`;
}
