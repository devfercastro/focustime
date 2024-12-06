import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { useTimerContext } from "../context/TimerContext";
import { usePreferencesContext } from "../context/PreferencesContext";

interface WorkSessionIndicatorProps {
  isCompleted: boolean;
  isCurrent: boolean;
}

const WorkSessionIndicator = ({
  isCompleted = true,
  isCurrent = false,
}: WorkSessionIndicatorProps) => {
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

export default function WorkSessionsTracker() {
  const {
    timerState: { pomodorosCount },
  } = useTimerContext();
  const {
    preferences: { pomodorosUntilLongBreak },
  } = usePreferencesContext();
  const [workSessions, setWorkSessions] = useState<WorkSessionIndicatorProps[]>(
    [],
  );

  // hook that updates the sessions indicator mainly when pomodrosCount changes (pomodorosUntilLongBreak should't change while timer is running only after restart)
  useEffect(() => {
    // edge case when pomodorosCount is greater that pomodorosUntilLongBreak
    // e.i. pomodorosCount is 16 and pomodorosUntilLongBreak is 4, this returns 0 because it's means it's first in four iteration
    const actualPomodorosCount = pomodorosCount % pomodorosUntilLongBreak;

    const updatedWorkSessions = Array(pomodorosUntilLongBreak)
      .fill(null)
      .map(
        (_, index: number) =>
          ({
            isCurrent: index === actualPomodorosCount, // if it's the current pomodoro
            isCompleted: index < actualPomodorosCount, // if it's completed
          }) as WorkSessionIndicatorProps,
      );

    setWorkSessions(updatedWorkSessions);
  }, [pomodorosCount, pomodorosUntilLongBreak]);

  return (
    <View style={styles.container}>
      {workSessions.map((data, index) => (
        <WorkSessionIndicator
          key={`WorkSessionIndicator${index + 1}`} // this is really annoying
          {...data}
        />
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
