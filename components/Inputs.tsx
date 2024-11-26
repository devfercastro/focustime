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
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.numberInputBtnsContainer}>
        <TouchableOpacity style={styles.numberInputBtn} onPress={decrement}>
          <Text style={{ color: "#fff", textAlign: "center" }}>-</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            width: 50,
            fontWeight: "bold",
          }}
        >
          {value}
        </Text>
        <TouchableOpacity style={styles.numberInputBtn} onPress={increment}>
          <Text style={{ color: "#fff", textAlign: "center" }}>+</Text>
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
    gap: 10,
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
});
