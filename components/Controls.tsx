import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { PauseIcon, ResetIcon, StartIcon } from "./Icons";
import { useTimerContext } from "../context/TimerContext";

interface ButtonProps {
  label: string;
  onPress: () => void;
  Icon: React.ComponentType<IconProps>;
}

export const ControlBtn = ({ label, onPress, Icon }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export const Controls = () => {
  const {
    timerState: { isReseted, isRunning },
    handleReset,
    handleStartPause,
  } = useTimerContext();

  return (
    <View style={styles.controls}>
      {isRunning ? (
        <ControlBtn label="Pause" onPress={handleStartPause} Icon={PauseIcon} />
      ) : (
        <ControlBtn label="Start" onPress={handleStartPause} Icon={StartIcon} />
      )}
      {!isReseted && (
        <ControlBtn label="Reset" onPress={handleReset} Icon={ResetIcon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: "column",
    rowGap: 10,
    height: 50 * 3 + 10 * 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#000",
    width: 100,
    height: 50,
  },
  label: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Controls;
