import { StyleSheet, Text, View } from "react-native";
import CircularProgressBar from "./CircularProgressBar";
import { formatTime } from "../helpers";
import { useTimerContext } from "../context/TimerContext";

const BORDER = 10;
const WIDTH = 300;

const TimeIndicator = ({ timeLeft }: { timeLeft: number }) => {
  const timeFormated = formatTime(timeLeft);
  return (
    <View style={styles.timeIndicatorContainer}>
      <Text style={styles.timeIndicator}>{timeFormated.minutes}</Text>
      <Text style={styles.timeIndicatorSeparator}>:</Text>
      <Text style={styles.timeIndicator}>{timeFormated.seconds}</Text>
    </View>
  );
};

export default function Timer() {
  const {
    timeLeft,
    mode: { duration },
  } = useTimerContext().timerState;

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
      <TimeIndicator timeLeft={timeLeft} />
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
