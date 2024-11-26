import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { NumberInput, SwitchInput } from "./Inputs";

interface SettingsProps {
  isVisible: boolean;
  setIsVisible: () => void;
}

const [screenHeight, screenWidth] = [
  Dimensions.get("window").height,
  Dimensions.get("window").width,
];

type TimerPreferences = {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  pomodorosUntilLongBreak: number;
  autoStart: boolean;
};

export default function Settings({ isVisible, setIsVisible }: SettingsProps) {
  const translateX = useRef(new Animated.Value(-screenWidth)).current;
  const [timerPreferences, setTimerPreferences] = useState<TimerPreferences>({
    workDuration: 10,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    pomodorosUntilLongBreak: 5,
    autoStart: true,
  });

  const handleNumberInput = (
    type: "work" | "short" | "long" | "count",
    value: 1 | -1,
  ) => {
    switch (type) {
      case "work":
        setTimerPreferences((prevState) => ({
          ...prevState,
          workDuration: prevState.workDuration + value,
        }));
        break;
      case "short":
        setTimerPreferences((prevState) => ({
          ...prevState,
          shortBreakDuration: prevState.shortBreakDuration + value,
        }));
        break;
      case "long":
        setTimerPreferences((prevState) => ({
          ...prevState,
          longBreakDuration: prevState.longBreakDuration + value,
        }));
        break;
      case "count":
        setTimerPreferences((prevState) => ({
          ...prevState,
          pomodorosUntilLongBreak: prevState.pomodorosUntilLongBreak + value,
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isVisible ? 0 : -screenWidth,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible, translateX]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <NumberInput
        label="Work duration:"
        value={timerPreferences.workDuration}
        increment={() => handleNumberInput("work", 1)}
        decrement={() => handleNumberInput("work", -1)}
      />
      <NumberInput
        label="Short break duration:"
        value={timerPreferences.shortBreakDuration}
        increment={() => handleNumberInput("short", 1)}
        decrement={() => handleNumberInput("short", -1)}
      />
      <NumberInput
        label="Long break duration:"
        value={timerPreferences.longBreakDuration}
        increment={() => handleNumberInput("long", 1)}
        decrement={() => handleNumberInput("long", -1)}
      />
      <NumberInput
        label="Pomodoros until long break:"
        value={timerPreferences.pomodorosUntilLongBreak}
        increment={() => handleNumberInput("count", 1)}
        decrement={() => handleNumberInput("count", -1)}
      />
      <SwitchInput
        label="Autostart:"
        isChecked={timerPreferences.autoStart}
        onChange={() =>
          setTimerPreferences((prevState) => ({
            ...prevState,
            autoStart: !prevState.autoStart,
          }))
        }
      />
      <TouchableOpacity onPress={setIsVisible} style={styles.closeBtn}>
        <Text>Hidde settings</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.75,
    height: screenHeight + 40,
    backgroundColor: "#f2f2f2",
    position: "absolute",
    zIndex: 10,
    padding: 40 + 20,
    left: 0,
  },

  closeBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    borderRadius: 10,
    backgroundColor: "red",
    padding: 20,
  },
});
