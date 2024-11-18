export function calculateArcCoordinates(
  progress: number,
  width: number,
  strokeWidth: number,
) {
  const center = width / 2;
  const radius = center - strokeWidth / 2;

  const angle = progress * 2 * Math.PI;

  const x = center + radius * Math.sin(angle);
  const y = center - radius * Math.cos(angle);

  const largeArcFlag = progress > 0.5 ? 1 : 0;

  return {
    x,
    y,
    largeArcFlag,
    radius,
    center,
  };
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export function formatProgress(currentTime: number, totalTime: number) {
  return currentTime / totalTime;
}
