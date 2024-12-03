import { TouchableOpacity, StyleSheet } from "react-native";
import { SettingsIcon } from "./Icons";

import { usePreferencesContext } from "../context/PreferencesContext";
import { useTimerContext } from "../context/TimerContext";

export const SettingsBtn = () => {
  const { setIsSettingsOpen, isSettingsOpen } = usePreferencesContext();
  const {
    timerState: { isReseted, isRunning },
  } = useTimerContext();

  const toggleSettings = () => {
    if (isReseted && !isRunning) setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleSettings}>
      <SettingsIcon
        width={40}
        height={40}
        color={isRunning || !isReseted ? "#ccc" : "#000"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 10,
  },
});
