import { StyleSheet, Text, View } from "react-native";
import CircularProgressBar from "./CircularProgressBar";
import { formatTime } from "../helpers";
import { useTimerContext } from "../context/TimerContext";

const BORDER = 10;
const WIDTH = 300;

const TimeIndicator = ({
  currentMode,
  timeLeft,
}: {
  currentMode: string;
  timeLeft: number;
}) => {
  const timeFormated = formatTime(timeLeft);
  return (
    <View style={timeIndicatorStyles.container}>
      <View style={timeIndicatorStyles.timeContainer}>
        <Text style={timeIndicatorStyles.timeValue}>
          {timeFormated.minutes}
        </Text>
        <Text style={timeIndicatorStyles.timeSeparator}>:</Text>
        <Text style={timeIndicatorStyles.timeValue}>
          {timeFormated.seconds}
        </Text>
      </View>
      <View style={timeIndicatorStyles.mode}>
        <Text style={timeIndicatorStyles.modeLabel}>{currentMode}</Text>
      </View>
    </View>
  );
};

export default function Timer() {
  const {
    timeLeft,
    mode: { label, duration },
  } = useTimerContext().timerState;

  return (
    <View style={timerStyles.container}>
      <CircularProgressBar
        style={timerStyles.progressBar}
        width={WIDTH}
        strokeWidth={BORDER}
        color="#000"
        duration={duration}
        timeLeft={timeLeft}
      />
      <TimeIndicator currentMode={label} timeLeft={timeLeft} />
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

const timerStyles = StyleSheet.create({
  container: {
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
});

const timeIndicatorStyles = StyleSheet.create({
  container: {
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
  timeContainer: {
    flexDirection: "row",
  },
  timeValue: {
    fontSize: 48,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  timeSeparator: {
    fontSize: 48,
    fontWeight: "bold",
    width: 22,
    textAlign: "center",
  },
  mode: {
    position: "absolute",
    top: 48 + 10, // the timeValue fontSize + 10px of space
  },
  modeLabel: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
