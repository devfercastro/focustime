import { useEffect, useRef } from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import { NumberInput, SwitchInput } from "./Inputs";

import { usePreferencesContext } from "../context/PreferencesContext";

// TODO: move this to another place
const [screenHeight, screenWidth] = [
  Dimensions.get("window").height,
  Dimensions.get("window").width,
];

export default function Settings() {
  const { preferences, setPreferences, isSettingsOpen } =
    usePreferencesContext();

  // animated value for horizontal sliding animation
  const translateX = useRef(new Animated.Value(-screenWidth)).current;

  // hook that triggers horizontal sliding animation when `isSettingsOpen` changes
  // `translateX` was added cause biome cries to much if not
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isSettingsOpen ? 0 : -screenWidth, // if settings are open, slide to left, otherwise slide to right
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isSettingsOpen, translateX]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <NumberInput
        label="Pomodoro duration"
        preferenceName="POMODORO"
        minMax={[1 * 60, 120 * 60]}
        step={60}
      />
      <NumberInput
        label="Short break duration"
        preferenceName="SHORT_BREAK"
        minMax={[1 * 60, 120 * 60]}
        step={60}
      />
      <NumberInput
        label="Long break duration"
        preferenceName="LONG_BREAK"
        minMax={[1 * 60, 120 * 60]}
        step={60}
      />
      <NumberInput
        label="Pomodoros until long break"
        preferenceName="pomodorosUntilLongBreak"
        minMax={[1, 10]}
        step={1}
        formatToMinutes={false}
      />
      <SwitchInput
        label="Autostart next mode"
        isChecked={preferences.autoStartNextMode}
        onChange={() =>
          setPreferences({
            ...preferences,
            autoStartNextMode: !preferences.autoStartNextMode,
          })
        }
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.75, // take the 3/4 of the screen (TODO: change it to laptop)
    height: screenHeight + 40, // for some reason I have to add 40px, I forgot why tbh
    backgroundColor: "#f2f2f2",
    position: "absolute",
    zIndex: 5, // SettingsBtn has zIndex of 10, and I don't want to cover it
    padding: 20,
    paddingTop: 50,
    left: 0,
    rowGap: 40,
  },
});
