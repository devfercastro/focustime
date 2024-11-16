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
