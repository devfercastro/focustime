import { StyleSheet, Text, View, Animated } from "react-native";
import CircularProgressBar from "./CircularProgressBar";
import { formatTime } from "../helpers";
import { useEffect, useRef } from "react";

const BORDER = 10;
const BLINK_DURATION = 1200;
const WIDTH = 300;

interface TimerProps {
  isRunning: boolean;
  duration: number;
  timeLeft: number;
}

const TimeIndicator = ({
  isRunning,
  timeLeft,
}: {
  isRunning: boolean;
  timeLeft: number;
}) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const timeFormated = formatTime(timeLeft);

  useEffect(() => {
    // If the timer is not running
    if (!isRunning) {
      const blink = Animated.sequence([
        // Fade out to 10% opacity
        Animated.timing(opacity, {
          toValue: 0.1,
          duration: BLINK_DURATION / 2,
          useNativeDriver: true,
        }),
        // Fade out to 100% opacity
        Animated.timing(opacity, {
          toValue: 1,
          duration: BLINK_DURATION / 2,
          useNativeDriver: true,
        }),
      ]);

      // Loop the animation
      Animated.loop(blink).start();
    }
    // If the timer is running
    else {
      // Reset opacity to 100%
      opacity.setValue(1);
    }

    return () => opacity.stopAnimation();
  }, [isRunning, opacity]);

  return (
    <Animated.View style={[styles.timeIndicatorContainer, { opacity }]}>
      <Text style={styles.timeIndicator}>{timeFormated.minutes}</Text>
      <Text style={styles.timeIndicatorSeparator}>:</Text>
      <Text style={styles.timeIndicator}>{timeFormated.seconds}</Text>
    </Animated.View>
  );
};

export default function Timer({ isRunning, duration, timeLeft }: TimerProps) {
  return (
    <View style={styles.timer}>
      <CircularProgressBar
        style={styles.progressBar}
        width={WIDTH}
        strokeWidth={BORDER}
        color="#000"
        duration={duration}
        timeLeft={timeLeft}
      />
      <TimeIndicator isRunning={isRunning} timeLeft={timeLeft} />
    </View>
  );
}

const styles = StyleSheet.create({
  timer: {
    width: WIDTH,
    height: WIDTH,
    borderRadius: WIDTH,
    borderWidth: BORDER,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  progressBar: {
    position: "absolute",
    top: -BORDER,
    left: -BORDER,
  },

  timeIndicatorContainer: {
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  timeIndicator: {
    fontSize: 48,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  timeIndicatorSeparator: {
    fontSize: 48,
    fontWeight: "bold",
    width: 22,
    textAlign: "center",
  },
});
