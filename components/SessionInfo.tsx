import { StyleSheet, Text, View } from "react-native";

interface SessionInfoProps {
  currentMode: Mode;
  pomodorosCount: number;
  pomodorosUntilLongBreak: number;
}

export default function SessionInfo({
  currentMode,
  pomodorosCount,
  pomodorosUntilLongBreak,
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
      <Text style={styles.pomodorosInfo}>
        Pomodoros completed: {pomodorosCount}
      </Text>
      <Text style={styles.pomodorosInfo}>
        Pomodoros until long break: {pomodorosUntilLongBreak}
      </Text>
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

  pomodorosInfo: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
