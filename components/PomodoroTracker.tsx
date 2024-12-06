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
    // edge case when pomodoroIndex is greater that pomodorosUntilLongBreak
    // e.i. pomodoroIndex is 16 and pomodorosUntilLongBreak is 4, this returns 0 because it's four iteration
    const actualpomodoroIndex = pomodoroIndex % pomodorosUntilLongBreak;

    const updatedPomodoros = Array(pomodorosUntilLongBreak)
      .fill(null)
      .map(
        (_, index: number) =>
          ({
            isCurrent: index === actualpomodoroIndex,
            isCompleted: index < actualpomodoroIndex,
          }) as PomodoroIndicatorProps,
      );

    setPomodoros(updatedPomodoros);
  }, [pomodoroIndex, pomodorosUntilLongBreak]);

  return (
    <View style={styles.container}>
      {pomodoros.map((data, index) => (
        <PomodoroIndicator key={`PomodoroIndicator${index + 1}`} {...data} />
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
