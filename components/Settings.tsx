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

  /*
   * This function modifies modes duration (Work/Short Break/Long Break)
   * @param the mode to change
   * @param the number of seconds to add/subtract (depends if it's positive or negative)
   */
  const handleModePreferencesChange = (
    modName: keyof Modes,
    number: number,
  ) => {
    // TODO: check if number is valid
    setPreferences({
      ...preferences,
      // on modes
      modes: {
        ...preferences.modes,
        // on the mode to modify
        [modName]: {
          ...preferences.modes[modName],
          // change the duration
          duration: preferences.modes[modName].duration + number,
        },
      },
    });
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <NumberInput
        label="Pomodoro"
        value={preferences.modes.POMODORO.duration}
        increment={() => handleModePreferencesChange("POMODORO", 60)}
        decrement={() => handleModePreferencesChange("POMODORO", -60)}
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
        label="Pomodoros until long break"
        value={preferences.pomodorosUntilLongBreak}
        formatToMinutes={false}
        increment={() =>
          setPreferences({
            ...preferences,
            pomodorosUntilLongBreak: preferences.pomodorosUntilLongBreak + 1,
          })
        }
        decrement={() =>
          setPreferences({
            ...preferences,
            pomodorosUntilLongBreak: preferences.pomodorosUntilLongBreak - 1,
          })
        }
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
