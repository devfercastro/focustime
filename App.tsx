import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import CircularProgressBar from "./components/CircularProgressBar";

const BORDER = 20;

export default function App() {
  const startHandler = () => {
    Alert.alert("start");
  };

  const resetHandler = () => {
    Alert.alert("reset");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro Tracker</Text>
      <View style={styles.timerContainer}>
        <CircularProgressBar
          style={styles.progressBar}
          width={200}
          strokeWidth={BORDER}
          color="#000"
          progress={0.2}
        />
        <Text style={styles.timer}>25:00</Text>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={startHandler}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetHandler}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },

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

  controlsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 16,
    width: 80,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
