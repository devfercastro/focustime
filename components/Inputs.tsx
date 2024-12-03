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
  const transformXAni = useAnimatedValue(isChecked ? 80 - 40 : 0);

  const toggleSwitch = () => {
    onChange();

    Animated.timing(transformXAni, {
      toValue: isChecked ? 0 : 80 - 40,
      duration: 200,
      useNativeDriver: true,
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
              transform: [{ translateX: transformXAni }],
            },
          ]}
        >
          {isChecked ? <OffIcon /> : <OnIcon />}
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
    fontWeight: "600",
  },
});

const switchInputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    overflow: "visible",
  },
  switchContainer: {
    width: 80,
    height: 30,
    borderRadius: 999,
    backgroundColor: "#fff",
    overflow: "visible",
    position: "relative",
  },
  switcher: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#000",
    color: "#fff",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0 - 5,
    left: 0,
  },
});

const numberInputStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    fontSize: 16,
    borderRadius: 125,
    width: 40,
    height: 40,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  btnValue: {
    fontSize: 24,
    textAlign: "center",
    width: 50,
    fontWeight: "bold",
  },
  btnSymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
