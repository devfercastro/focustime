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
  const minutes = String(Math.floor(seconds / 60));
  const remainingSeconds = String(Math.floor(seconds % 60));

  return {
    minutes: minutes.padStart(2, "0"),
    seconds: remainingSeconds.padStart(2, "0"),
  };
}

export function calculateProgress(timeLeft: number, duration: number) {
  return (duration - timeLeft) / duration;
}
