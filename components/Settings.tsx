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
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
}

const [screenHeight, screenWidth] = [
  Dimensions.get("window").height,
  Dimensions.get("window").width,
];

export default function Settings({
  isVisible,
  setIsVisible,
  preferences,
  setPreferences,
}: SettingsProps) {
  const translateX = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isVisible ? 0 : -screenWidth,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible, translateX]);

  const handleModePreferencesChange = (
    modName: keyof Modes,
    number: number,
  ) => {
    setPreferences({
      ...preferences,
      modes: {
        ...preferences.modes,
        [modName]: {
          ...preferences.modes[modName],
          duration: preferences.modes[modName].duration + number,
        },
      },
    });
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <NumberInput
        label="Work"
        value={preferences.modes.WORK.duration}
        increment={() => handleModePreferencesChange("WORK", 60)}
        decrement={() => handleModePreferencesChange("WORK", -60)}
      />
      <NumberInput
        label="Short break"
        value={preferences.modes.SHORT_BREAK.duration}
        increment={() => handleModePreferencesChange("SHORT_BREAK", 60)}
        decrement={() => handleModePreferencesChange("SHORT_BREAK", -60)}
      />
      <NumberInput
        label="Long break"
        value={preferences.modes.LONG_BREAK.duration}
        increment={() => handleModePreferencesChange("LONG_BREAK", 60)}
        decrement={() => handleModePreferencesChange("LONG_BREAK", -60)}
      />
      <NumberInput
        label="Pomodoros until long break:"
        value={preferences.pomodorosUntilLongBreak}
        formatToMinutes={false}
        increment={() =>
          setPreferences({
            ...preferences,
            pomodorosUntilLongBreak: preferences.pomodorosUntilLongBreak + 60,
          })
        }
        decrement={() =>
          setPreferences({
            ...preferences,
            pomodorosUntilLongBreak: preferences.pomodorosUntilLongBreak - 60,
          })
        }
      />
      <SwitchInput
        label="Autostart next mode:"
        isChecked={preferences.autoStartNextMode}
        onChange={() =>
          setPreferences({
            ...preferences,
            autoStartNextMode: !preferences.autoStartNextMode,
          })
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
    zIndex: 600,
    padding: 20,
    paddingTop: 50,
    left: 0,
    rowGap: 20,
  },

  closeBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    borderRadius: 600,
    backgroundColor: "red",
    padding: 20,
  },
});
