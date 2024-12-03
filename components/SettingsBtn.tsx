import { TouchableOpacity, StyleSheet } from "react-native";
import { SettingsIcon } from "./Icons";

import { usePreferencesContext } from "../context/PreferencesContext";
import { useTimerContext } from "../context/TimerContext";

export const SettingsBtn = () => {
  const { toggleSettings } = usePreferencesContext();
  const { timerState } = useTimerContext();

  // TODO: Disable button when timer is running or is not reseted
  return (
    <TouchableOpacity style={styles.button} onPress={toggleSettings}>
      <SettingsIcon
        width={40}
        height={40}
        color={timerState.isRunning || !timerState.isReseted ? "#ccc" : "#000"}
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
