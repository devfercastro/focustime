import Svg, { Path } from "react-native-svg";
import type { StyleProp, ViewStyle } from "react-native";
import { calculateArcCoordinates, calculateProgress } from "../helpers/index";

interface CircularProgressBarProps {
  width: number;
  strokeWidth: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  timeLeft: number;
  duration: number;
}

// TODO: use const component or function but not both asshole.
const CircularProgressBar = ({
  width = 200,
  strokeWidth = 20,
  color = "#000",
  style,
  timeLeft,
  duration,
}: CircularProgressBarProps) => {
  // calculates the percentage of the passed time
  const progress = calculateProgress(timeLeft, duration);

  // calculate the final coordinates of the arc based on progress
  const { radius, center, x, y, largeArcFlag } = calculateArcCoordinates(
    progress,
    width,
    strokeWidth,
  );

  // Calculate initial coordinates for the arc
  const [cx, cy] = [center, strokeWidth / 2];

  // circle svg path
  let path: string;

  // if progress >= 1 (full circle or 100% of time completed), draw 2 180° arcs
  // why not just draw 1 360° arc? well the mf arc hides if start coordinates === end coordinates
  if (progress >= 1) {
    // the only differences between the 2 arcs is the clockwise/counterclockwise flag
    const rightArc = `M${cx} ${cy} A ${radius} ${radius} 0 0 1 ${cx} ${width - cy}`;
    //                                            this number right here indicates clockwise if 1 and counterclockwise if 0
    //                                                      |
    const leftArc = `M${cx} ${cy} A ${radius} ${radius} 0 0 0 ${cx} ${width - cy}`;

    path = `${rightArc} ${leftArc}`;
  }
  // if progres < 1 or time < 100% completed, draw 1 arc clockwise
  else {
    // arc path
    // I'm not gonna fully explain what arcs are, ask some chatbot "svg arcs" if you need more information
    // `A rx ry x-axis-rotation large-arc-flag sweep-flag final-x final-y`
    const arcPath = `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y}`;
    // this `M${cx} ${cy}` are the start coordinates of the arc
    path = `M${cx} ${cy} ${arcPath}`;
  }

  return (
    <Svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`} // this for a 1:1 aspect ratio
      style={style}
    >
      <Path d={path} stroke={color} strokeWidth={strokeWidth} fill={"none"} />
    </Svg>
  );
};

export default CircularProgressBar;
