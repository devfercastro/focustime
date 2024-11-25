import { Switch, View, Text, StyleSheet, TouchableOpacity } from "react-native";

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
}

export const SwitchInput = ({
  label,
  isChecked,
  onChange,
}: SwitchInputProps) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch value={isChecked} onValueChange={onChange} />
    </View>
  );
};

export const NumberInput = ({
  label,
  value,
  increment,
  decrement,
}: NumberInputProps) => {
  return (
    <View style={styles.numberInputContainer}>
      <Text>{label}</Text>
      <View style={styles.numberInputBtnsContainer}>
        <TouchableOpacity style={styles.numberInputBtn} onPress={decrement}>
          <Text style={{ color: "#fff", textAlign: "center" }}>-</Text>
        </TouchableOpacity>
        <Text>{value}</Text>
        <TouchableOpacity style={styles.numberInputBtn} onPress={increment}>
          <Text style={{ color: "#fff", textAlign: "center" }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },

  numberInputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    gap: 10,
  },
  numberInputBtnsContainer: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-between",
  },
  numberInputBtn: {
    fontSize: 16,
    borderRadius: 100,
    width: 30,
    backgroundColor: "#000",
  },
});
