/*
 * Calculates the arc coordinates for a given progress
 * @param progress The progress between 0 and 1 (should be until 1)
 * @param width The width of the arc
 * @param strokeWidth The stroke width of the arc
 * @returns x,y final arc coordinates; largeArcFlag if it's a +180° arc or not; radius; center this one for located initial x coordinate
 */
export function calculateArcCoordinates(
  progress: number,
  width: number,
  strokeWidth: number,
) {
  // my promt engineer skills in action btw

  // get the center obviously
  const center = width / 2;
  // for the radius I need to substract the half of the stroke width (centering purpose)
  const radius = center - strokeWidth / 2;

  // convert to radians
  const angle = progress * 2 * Math.PI;

  // calculates the final x and y coordinates
  // neither I fully understand this but here some examples
  // progress = 0 => x = center + radius * sin(0) = center
  //                 y = center - radius * cos(0) = center - radius
  // progress = 0.25 => x = center + radius * sin(pi/2) = center + radius
  //                 y = center - radius * cos(pi/2) = center
  // progress = 0.5 => x = center + radius * sin(pi) = center
  //                 y = center - radius * cos(pi) = center + radius
  // progress = 0.75 => x = center + radius * sin(3pi/2) = center - radius
  //                 y = center - radius * cos(3pi/2) = center
  // progress = 1 => x = center + radius * sin(2pi) = center
  //                y = center - radius * cos(2pi) = center - radius
  const x = center + radius * Math.sin(angle);
  const y = center - radius * Math.cos(angle);

  // if progress < 0.5 then it's a arc from 0 to 180°
  // otherwise it's a arc from 180° to 360°
  const largeArcFlag = progress > 0.5 ? 1 : 0;

  return {
    x,
    y,
    largeArcFlag,
    radius,
    center,
  };
}

/*
 * Formats the given seconds in minutes and seconds with a fixed length of 2 characters
 * @param seconds The number of seconds
 * @returns an object with minutes and seconds each of 2 characters
 */
export function formatTime(seconds: number) {
  const minutes = String(Math.floor(seconds / 60));
  const remainingSeconds = String(Math.floor(seconds % 60));

  return {
    minutes: minutes.padStart(2, "0"),
    seconds: remainingSeconds.padStart(2, "0"),
  };
}

/*
 * Calculates the progress between 0 and 1 for a given time left and duration
 * @param timeLeft The time left in seconds
 * @param duration The duration in seconds
 * @returns The progress between 0 and 1
 */
export function calculateProgress(timeLeft: number, duration: number) {
  return (duration - timeLeft) / duration;
}
