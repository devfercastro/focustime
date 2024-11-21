import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import CircularProgressBar from "./CircularProgressBar";
import { formatTime } from "../helpers";

const BORDER = 20;

interface TimerProps {
  isRunning: boolean;
  currentTime: number;
  totalTime: number;
}

export default function Timer({
  isRunning,
  currentTime,
  totalTime,
}: TimerProps) {
  return (
    <View style={styles.timerContainer}>
      <CircularProgressBar
        style={styles.progressBar}
        width={200}
        strokeWidth={BORDER}
        color="#000"
        totalTime={totalTime}
        currentTime={currentTime}
      />
      <Text style={styles.timer}>{formatTime(currentTime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    width: 200,
    height: 200,
    borderRadius: 125,
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
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },
});
