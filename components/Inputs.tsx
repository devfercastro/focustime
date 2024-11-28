import { Switch, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { formatTime } from "../helpers";

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
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Switch value={isChecked} onValueChange={onChange} />
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
    <View style={styles.numberInputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.numberInputBtnsContainer}>
        <TouchableOpacity style={styles.numberInputBtn} onPress={decrement}>
          <Text style={styles.numberInputBtnSymbols}>-</Text>
        </TouchableOpacity>
        <Text style={styles.numberInputBtnValue}>
          {formatToMinutes ? formatedValue : String(value).padStart(2, "0")}
        </Text>
        <TouchableOpacity style={styles.numberInputBtn} onPress={increment}>
          <Text style={styles.numberInputBtnSymbols}>+</Text>
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

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },

  numberInputContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  numberInputBtnsContainer: {
    flexDirection: "row",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  numberInputBtn: {
    fontSize: 16,
    borderRadius: 125,
    width: 40,
    height: 40,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  numberInputBtnValue: {
    fontSize: 24,
    textAlign: "center",
    width: 50,
    fontWeight: "bold",
  },
  numberInputBtnSymbols: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
