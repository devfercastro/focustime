import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

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
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 20,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
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
