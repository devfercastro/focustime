import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import { DEFAULT_STATE, MODES } from "./constans";

export default function App() {
  const [appState, setAppState] = useState<AppState>(DEFAULT_STATE);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // If the timer is running and timeLeft > 0, decrement the timeLeft
    if (appState.isRunning && appState.timeLeft > 0) {
      interval = setInterval(() => {
        setAppState((prevState) => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1,
        }));
      }, 100);
    }
    // If the timer is finished, change the mode
    else if (appState.timeLeft === 0) {
      handleModeTransition();
    }

    return () => clearInterval(interval);
  }, [appState.isRunning, appState.timeLeft]);

  const handleModeTransition = () => {
    // If autoStart is disabled, stop the timer
    if (!appState.autoStart) {
      setAppState((prevState) => ({
        ...prevState,
        isRunning: false,
      }));
    }
    // On work mode
    if (appState.mode.name === "work") {
      // Increment the completed completed work sessions counter
      setAppState((prevState) => ({
        ...prevState,
        workSessionsCompleted: prevState.workSessionsCompleted + 1,
      }));
      // If completed work sessions < 4, switch to short break
      if (appState.workSessionsCompleted < 4) {
        setAppState((prevState) => ({
          ...prevState,
          mode: MODES.SHORT_BREAK,
          timeLeft: MODES.SHORT_BREAK.duration,
        }));
      }
      // If completed work sessions >= 4, switch to long break
      else {
        setAppState((prevState) => ({
          ...prevState,
          mode: MODES.LONG_BREAK,
          timeLeft: MODES.LONG_BREAK.duration,
          workSessionsCompleted: 0,
        }));
      }
    }
    // On short break or long break mode, switch to work mode
    else if (
      appState.mode.name === "shortBreak" ||
      appState.mode.name === "longBreak"
    ) {
      setAppState((prevState) => ({
        ...prevState,
        mode: MODES.WORK,
        timeLeft: MODES.WORK.duration,
      }));
    }
  };

  const handleStartPause = () => {
    setAppState((prevState) => ({
      ...prevState,
      isRunning: !prevState.isRunning,
    }));
  };

  const handleReset = () => {
    setAppState((prevState) => DEFAULT_STATE);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro Tracker</Text>
      <Timer
        timeLeft={appState.timeLeft}
        duration={appState.mode.duration}
        isRunning={appState.isRunning}
      />
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartPause}>
          <Text style={styles.buttonText}>
            {appState.isRunning ? "Pause" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* TODO: Refactor, move to a dedicated components. Eg. Metrics.tsx */}
      <View style={styles.modeContainer}>
        <Text style={styles.mode}>Mode: </Text>
        <Text
          style={[
            styles.mode,
            appState.mode.name === "work" ? styles.modeWork : styles.modeBreak,
          ]}
        >
          {appState.mode.label}
        </Text>
      </View>
      <Text>Work sessions completed: {appState.workSessionsCompleted}</Text>
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

  modeContainer: {
    flexDirection: "row",
  },
  mode: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modeWork: {
    color: "#008000",
  },
  modeBreak: {
    color: "#800000",
  },
});
