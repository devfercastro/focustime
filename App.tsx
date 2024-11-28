import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { DEFAULT_PREFERENCES } from "./constans";

import Timer from "./components/Timer";
import SessionInfo from "./components/SessionInfo";
import Settings from "./components/Settings";

import useTimer from "./hooks/useTimer";

export default function App() {
  const [preferences, setPreferences] =
    useState<Preferences>(DEFAULT_PREFERENCES);
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);
  const { timerState, handleStartPause, handleReset } = useTimer(preferences);

  const handleSettingsVisibility = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  return (
    <View style={styles.container}>
      <Settings
        isVisible={isSettingsVisible}
        setIsVisible={handleSettingsVisibility}
        preferences={preferences}
        setPreferences={setPreferences}
      />
      <Text style={styles.title}>Pomodoro Tracker</Text>
      <Timer
        timeLeft={timerState.timeLeft}
        duration={timerState.mode.duration}
        isRunning={timerState.isRunning}
      />
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartPause}>
          <Text style={styles.buttonText}>
            {timerState.isRunning ? "Pause" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <SessionInfo
        currentMode={timerState.mode}
        pomodorosCount={timerState.pomodorosCount}
        pomodorosUntilLongBreak={timerState.pomodorosUntilLongBreak}
      />
      <TouchableOpacity
        style={[styles.button, { position: "absolute", bottom: 20, left: 20 }]}
        onPress={handleSettingsVisibility}
      >
        <Text style={styles.buttonText}>Show Settings</Text>
      </TouchableOpacity>
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
    position: "relative",
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
});
