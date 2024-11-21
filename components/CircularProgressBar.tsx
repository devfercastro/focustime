import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { calculateArcCoordinates, calculateProgress } from "../helpers/index";

interface CircularProgressBarProps {
  width?: number;
  strokeWidth?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  timeLeft: number;
  duration: number;
}

const CircularProgressBar = ({
  width = 200,
  strokeWidth = 20,
  color = "#000",
  style,
  timeLeft,
  duration,
}: CircularProgressBarProps) => {
  const progress = calculateProgress(timeLeft, duration);

  // Calculate the final coordinates of the arc based on progress
  const { radius, center, x, y, largeArcFlag } = calculateArcCoordinates(
    progress,
    width,
    strokeWidth,
  );

  // Calculate initial coordinates for the arc
  const [cx, cy] = [center, strokeWidth / 2];

  let path: string;

  if (progress >= 1) {
    const rightArc = `M${cx} ${cy} A ${radius} ${radius} 0 0 1 ${cx} ${width - cy}`;
    const leftArc = `M${cx} ${cy} A ${radius} ${radius} 0 0 0 ${cx} ${width - cy}`;

    path = `${rightArc} ${leftArc}`;
  } else {
    const arcPath = `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y}`;
    path = `M${cx} ${cy} ${arcPath}`;
  }

  return (
    <Svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      style={style}
    >
      <Path d={path} stroke={color} strokeWidth={strokeWidth} fill={"none"} />
    </Svg>
  );
};

export default CircularProgressBar;
