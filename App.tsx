import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { DEFAULT_PREFERENCES, DEFAULT_STATE, MODES } from "./constans";

import Timer from "./components/Timer";
import SessionInfo from "./components/SessionInfo";
import Settings from "./components/Settings";

export default function App() {
  const [appPreferences, setAppPreferences] =
    useState<AppPreferences>(DEFAULT_PREFERENCES);
  const [appState, setAppState] = useState<AppState>(DEFAULT_STATE);
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(true);

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
      // If completed work sessions < 4, switch to short break
      if (appState.sessionsCompleted < 4) {
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
          sessionsCompleted: 0,
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
      // Increment the completed completed sessions counter
      setAppState((prevState) => ({
        ...prevState,
        sessionsCompleted: prevState.sessionsCompleted + 1,
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

  const handleSettingsVisibility = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const handlePreferencesChange = (
    preference: keyof AppPreferences,
    value: 1 | -1,
  ) => {
    if (preference === "autoStart") {
      setAppPreferences((prevState) => ({
        ...prevState,
        autoStart: !prevState.autoStart,
      }));
    } else {
      setAppPreferences((prevState) => ({
        ...prevState,
        [preference]: prevState[preference] + value,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Settings
        isVisible={isSettingsVisible}
        setIsVisible={handleSettingsVisibility}
        preferences={appPreferences}
        handlePreferencesChange={handlePreferencesChange}
      />
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
      <SessionInfo
        currentMode={appState.mode}
        sessionsCompleted={appState.sessionsCompleted}
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
