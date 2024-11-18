import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { calculateArcCoordinates } from "../helpers/index";

interface CircularProgressBarProps {
  width?: number;
  strokeWidth?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  progress: number;
}

const CircularProgressBar = ({
  width = 200,
  strokeWidth = 20,
  color = "#000",
  style,
  progress,
}: CircularProgressBarProps) => {
  // Calculate the final coordinates of the arc based on progress
  const { radius, center, x, y, largeArcFlag } = calculateArcCoordinates(
    progress,
    width,
    strokeWidth,
  );

  // Calculate initial coordinates for the arc
  const [cx, cy] = [center, strokeWidth / 2];

  // Createa the arch path
  const arcPath = `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y}`;
  // Set start arc position
  const path = `M${cx} ${cy} ${arcPath}`;

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
