import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

interface CircularProgressBarProps {
  width: number;
  strokeWidth: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const CircularProgressBar = ({
  width,
  strokeWidth,
  color = "#000",
  style,
}: CircularProgressBarProps) => {
  const radius = width / 2 - strokeWidth / 2;

  const [cx, cy] = [width / 2, strokeWidth / 2];

  const arcPath = `A ${radius} ${radius} 0 1 1 ${cx - 1} ${cy}`;
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

const styles = StyleSheet.create({
  svg: {
    position: "absolute",
  },
});

export default CircularProgressBar;
