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
  preferences: AppPreferences;
  handlePreferencesChange: (
    preference: keyof AppPreferences,
    value: 1 | -1,
  ) => void;
}

const [screenHeight, screenWidth] = [
  Dimensions.get("window").height,
  Dimensions.get("window").width,
];

type preferences = {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  pomodorosUntilLongBreak: number;
  autoStart: boolean;
};

export default function Settings({
  isVisible,
  setIsVisible,
  preferences,
  handlePreferencesChange,
}: SettingsProps) {
  const translateX = useRef(new Animated.Value(-screenWidth)).current;

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
        label="Work"
        value={preferences.workDuration}
        increment={() => handlePreferencesChange("workDuration", 1)}
        decrement={() => handlePreferencesChange("workDuration", -1)}
      />
      <NumberInput
        label="Short break"
        value={preferences.shortBreakDuration}
        increment={() => handlePreferencesChange("shortBreakDuration", 1)}
        decrement={() => handlePreferencesChange("shortBreakDuration", -1)}
      />
      <NumberInput
        label="Long break"
        value={preferences.longBreakDuration}
        increment={() => handlePreferencesChange("longBreakDuration", 1)}
        decrement={() => handlePreferencesChange("longBreakDuration", -1)}
      />
      <NumberInput
        label="Pomodoros until long break:"
        value={preferences.pomodorosUntilLongBreak}
        increment={() => handlePreferencesChange("pomodorosUntilLongBreak", 1)}
        decrement={() => handlePreferencesChange("pomodorosUntilLongBreak", -1)}
      />
      <SwitchInput
        label="Autostart:"
        isChecked={preferences.autoStart}
        onChange={() => handlePreferencesChange("autoStart", 1)}
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
    padding: 20,
    paddingTop: 50,
    left: 0,
    rowGap: 20,
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
