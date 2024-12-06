import { TouchableOpacity, StyleSheet, View } from "react-native";
import { PauseIcon, ResetIcon, StartIcon } from "./Icons";
import { useTimerContext } from "../context/TimerContext";

interface ButtonProps {
  onPress: () => void;
  Icon: React.ComponentType<IconProps>;
}

export const ControlBtn = ({ onPress, Icon }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon />
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
        <ControlBtn onPress={handleStartPause} Icon={PauseIcon} />
      ) : (
        <ControlBtn onPress={handleStartPause} Icon={StartIcon} />
      )}
      {!isReseted && <ControlBtn onPress={handleReset} Icon={ResetIcon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: "column",
    rowGap: 10,
    height: 100 * 2 + 10 * 2, // the size of two buttons (100 * 2) + the gap between them (10 * 2)
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#000",
    width: 100,
    height: 100,
  },
});

export default Controls;
