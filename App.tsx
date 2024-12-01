import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { DEFAULT_PREFERENCES } from "./constans";

import Timer from "./components/Timer";
import Settings from "./components/Settings";
import Controls from "./components/Controls";

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
      <Timer
        timeLeft={timerState.timeLeft}
        duration={timerState.mode.duration}
        isRunning={timerState.isRunning}
      />
      <Controls
        timerStatus={timerState.isRunning}
        handleStartPause={handleStartPause}
        handleReset={handleReset}
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
    rowGap: 50,
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
