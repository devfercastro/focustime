import {
  Switch,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useAnimatedValue,
} from "react-native";
import { formatTime } from "../helpers";
import { OffIcon, OnIcon } from "./Icons";

interface SwitchInputProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

interface NumberInputProps {
  label: string;
  value: number;
  increment: () => void;
  decrement: () => void;
  formatToMinutes?: boolean;
}

export const SwitchInput = ({
  label,
  isChecked,
  onChange,
}: SwitchInputProps) => {
  // this is an animated value, dah...
  const transformXAni = useAnimatedValue(0);

  /*
   * This function toggles the switch and calls the onChange function
   */
  const toggleSwitch = () => {
    onChange(); // call the onChange function

    // animate the switch
    Animated.timing(transformXAni, {
      toValue: isChecked ? 0 : 80 - 40, // move to left if not isChecked, move to right if isChecked
      duration: 200,
      useNativeDriver: true, // not sure what this does
    }).start();
  };

  return (
    <View style={switchInputStyles.container}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TouchableOpacity
        style={switchInputStyles.switchContainer}
        onPress={toggleSwitch}
      >
        <Animated.View
          style={[
            switchInputStyles.switcher,
            {
              transform: [{ translateX: transformXAni }], // animated value
            },
          ]}
        >
          {isChecked ? <OnIcon color="#000" /> : <OffIcon color="#000" />}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export const NumberInput = ({
  label,
  value,
  increment,
  decrement,
  formatToMinutes = true,
}: NumberInputProps) => {
  const formatedValue = formatTime(value).minutes;

  return (
    <View style={numberInputStyles.container}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={numberInputStyles.btnContainer}>
        <TouchableOpacity style={numberInputStyles.btn} onPress={decrement}>
          <Text style={numberInputStyles.btnSymbol}>-</Text>
        </TouchableOpacity>

        <Text style={numberInputStyles.btnValue}>
          {/* edge case for pomodoros until long break input */}
          {formatToMinutes ? formatedValue : String(value).padStart(2, "0")}
        </Text>

        <TouchableOpacity style={numberInputStyles.btn} onPress={increment}>
          <Text style={numberInputStyles.btnSymbol}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

// FIX: must be at least 5px between switcher and switchContainer
const switchInputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  switchContainer: {
    width: 80 + 8, // For some reason the extra must be 8 and not 4
    height: 50,
    position: "relative",
    padding: 2,
    borderRadius: 999,
    backgroundColor: "#000",
  },
  switcher: {
    width: 40,
    height: 40,
    top: 5, // This one izi cause it's parent height is 50
    left: 4, // For some reason must be 4 and not 2
    overflow: "hidden",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#fff",
  },
});

const numberInputStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  btnContainer: {
    width: 150,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 999,
    padding: 5, // don't know why works
  },
  btn: {
    borderRadius: 125,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnValue: {
    fontSize: 24,
    textAlign: "center",
    width: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  btnSymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});
