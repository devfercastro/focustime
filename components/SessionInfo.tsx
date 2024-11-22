import { StyleSheet, Text, View } from "react-native";

interface SessionInfoProps {
  currentMode: Mode;
  sessionsCompleted: number;
}

export default function SessionInfo({
  currentMode,
  sessionsCompleted,
}: SessionInfoProps) {
  return (
    <View style={styles.sessionInfoContainer}>
      <View style={styles.modeContainer}>
        <Text style={styles.mode}>Mode: </Text>
        <Text
          style={[
            styles.mode,
            currentMode.name === "work" ? styles.modeWork : styles.modeBreak,
          ]}
        >
          {currentMode.label}
        </Text>
      </View>
      <Text>Sessions completed: {sessionsCompleted}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sessionInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  modeContainer: {
    flexDirection: "row",
  },
  mode: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modeWork: {
    color: "#008000",
  },
  modeBreak: {
    color: "#800000",
  },
});
