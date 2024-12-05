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
}: {
  isCompleted?: boolean;
  isCurrent?: boolean;
}) => {
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

  useEffect(() => {
    // edge case when pomodorosCount is greater that pomodorosUntilLongBreak
    // e.i. pomodorosCount is 16 and pomodorosUntilLongBreak is 4, this returns 0 because it's four iteration
    const actualPomodorosCount = pomodorosCount % pomodorosUntilLongBreak;

    const updatedWorkSessions = Array(pomodorosUntilLongBreak)
      .fill(null)
      .map(
        (_, index: number) =>
          ({
            isCurrent: index === actualPomodorosCount,
            isCompleted: index < actualPomodorosCount,
          }) as WorkSessionIndicatorProps,
      );

    setWorkSessions(updatedWorkSessions);
  }, [pomodorosCount, pomodorosUntilLongBreak]);

  return (
    <View style={styles.container}>
      {workSessions.map((data, index) => (
        <WorkSessionIndicator
          key={`WorkSessionIndicator${index + 1}`}
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
