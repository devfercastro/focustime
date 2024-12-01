import { StyleSheet, Text, View } from "react-native";

interface SessionInfoProps {
  currentMode: Mode;
  pomodorosCount: number;
  pomodorosUntilLongBreak: number;
}

const Box = ({ label, value }: { label: string; value: number }) => (
  <View style={styles.box}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function SessionInfo({
  currentMode,
  pomodorosCount,
  pomodorosUntilLongBreak,
}: SessionInfoProps) {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.mode,
          currentMode.name === "work" ? styles.modeWork : styles.modeBreak,
        ]}
      >
        {currentMode.label}
      </Text>
      <View style={styles.boxes}>
        <Box label="Completed" value={pomodorosCount} />
        <Box label="Until long break" value={pomodorosUntilLongBreak} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  boxes: {
    flexDirection: "row",
  },
  box: {
    width: 120,
    alignItems: "center",
    flexDirection: "column",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
  mode: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modeWork: {
    color: "#008000",
  },
  modeBreak: {
    color: "#800000",
  },
});
