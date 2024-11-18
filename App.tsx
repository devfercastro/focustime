import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import CircularProgressBar from "./components/CircularProgressBar";
import { useState, useEffect } from "react";

const BORDER = 20;
const POMODORO_TIME = 1 * 60;

type appStatus = {
  isRunning: boolean;
  mode: "work" | "break";
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function formatProgress(currentTime: number, totalTime: number) {
  return currentTime / totalTime;
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [appStatus, setAppStatus] = useState<appStatus>({
    isRunning: false,
    mode: "work",
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (appStatus.isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setAppStatus((prevStatus) => {
              return {
                ...prevStatus,
                isRunning: false,
              };
            });
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [appStatus.isRunning, timeLeft]);

  const startHandler = () => {
    setAppStatus((prevStatus) => {
      return {
        ...prevStatus,
        isRunning: !prevStatus.isRunning,
      };
    });
  };

  const resetHandler = () => {
    setTimeLeft(POMODORO_TIME);
    setAppStatus((prevStatus) => {
      return {
        ...prevStatus,
        isRunning: false,
      };
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro Tracker</Text>
      <View style={styles.timerContainer}>
        <CircularProgressBar
          style={styles.progressBar}
          width={200}
          strokeWidth={BORDER}
          color="#000"
          progress={formatProgress(timeLeft, POMODORO_TIME)}
        />
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={startHandler}>
          <Text style={styles.buttonText}>
            {appStatus.isRunning ? "Pause" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetHandler}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },

  timerContainer: {
    width: 200,
    height: 200,
    borderRadius: 125,
    borderWidth: BORDER,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  progressBar: {
    position: "absolute",
    top: -BORDER,
    left: -BORDER,
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },

  controlsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 16,
    width: 80,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
