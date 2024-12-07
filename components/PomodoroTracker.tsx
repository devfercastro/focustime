import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { useTimerContext } from "../context/TimerContext";
import { usePreferencesContext } from "../context/PreferencesContext";

interface PomodoroIndicatorProps {
  isCompleted: boolean;
  isCurrent: boolean;
}

const PomodoroIndicator = ({
  isCompleted = true,
  isCurrent = false,
}: PomodoroIndicatorProps) => {
  return (
    <Svg height={18} width={18}>
      <Circle
        cx={9}
        cy={9}
        r={8}
        fill={isCompleted ? "#000" : "#ccc"}
        strokeWidth={isCurrent ? 1 : 0}
        stroke={"red"}
      />
    </Svg>
  );
};

export default function PomodorosTracker() {
  const {
    timerState: { pomodoroIndex },
  } = useTimerContext();
  const {
    preferences: { pomodorosUntilLongBreak },
  } = usePreferencesContext();
  const [pomodoros, setPomodoros] = useState<PomodoroIndicatorProps[]>([]);

  useEffect(() => {
    console.log({ pomodoroIndex, pomodorosUntilLongBreak });
    const updatedPomodoros = Array(pomodorosUntilLongBreak)
      .fill(null)
      .map((_, index: number) => {
        const currentIndex = index + 1; // remember pomodoro index it's non-zero

        return {
          // add 1 to index, because pomodoroIndex it's non-zero
          isCurrent: currentIndex === pomodoroIndex,
          isCompleted: currentIndex < pomodoroIndex,
        } as PomodoroIndicatorProps;
      });

    setPomodoros(updatedPomodoros);
  }, [pomodoroIndex, pomodorosUntilLongBreak]);

  return (
    <View style={styles.container}>
      {pomodoros.map((data, index) => (
        <PomodoroIndicator key={`pomodoroIndicator${index + 1}`} {...data} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
});
