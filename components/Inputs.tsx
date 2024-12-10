import {
  Switch,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useAnimatedValue,
} from "react-native";
import { formatTime } from "../helpers";
import { OffIcon, OnIcon } from "./Icons";
import { useEffect, useRef, useState } from "react";
import { usePreferencesContext } from "../context/PreferencesContext";

interface SwitchInputProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

export const SwitchInput = ({
  label,
  isChecked,
  onChange,
}: SwitchInputProps) => {
  // this is an animated value, dah...
  // TODO: implement useRef
  const transformXAni = useAnimatedValue(isChecked ? 80 - 40 : 0);

  /*
   * This function runs the onChange function and triggers the switch animation
   */
  const toggleSwitch = () => {
    onChange(); // call the onChange function

    // start the animation
    Animated.timing(transformXAni, {
      toValue: !isChecked ? 80 - 40 : 0, // if false move it to the right, otherwise move to left
      duration: 200,
      useNativeDriver: true, // not sure what this does
    }).start();
  };

  return (
    <View style={switchInputStyles.container}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TouchableOpacity
        style={switchInputStyles.switchContainer}
        onPress={toggleSwitch}
      >
        <Animated.View
          style={[
            switchInputStyles.switcher,
            {
              transform: [{ translateX: transformXAni }], // animated value
            },
          ]}
        >
          {isChecked ? <OnIcon color="#000" /> : <OffIcon color="#000" />}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

interface NumberInputProps {
  label: string;
  preferenceName: keyof Modes | "pomodorosUntilLongBreak";
  minMax: [number, number];
  step: number;
  formatToMinutes?: boolean;
}

export const NumberInput = ({
  label,
  preferenceName,
  minMax,
  step,
  formatToMinutes = true,
}: NumberInputProps) => {
  const { preferences, setPreferences } = usePreferencesContext();

  /*
   * This function returns the current value of the preference
   * @param the preference to get the value
   */
  const getCurrentValue = (
    preferenceName: keyof Modes | "pomodorosUntilLongBreak",
  ): number => {
    // I don't know why I can't use the ternary operator here
    if (preferenceName === "pomodorosUntilLongBreak") {
      return preferences.pomodorosUntilLongBreak;
    }
    return preferences.modes[preferenceName].duration;
  };

  /*
   * This function replaces the current value of the preference with a new one
   * @param the new value to set
   */
  const changeCurrentValue = (newValue: number): void => {
    // again I can't use thernary operator. At least is more readable this way, right?
    if (preferenceName === "pomodorosUntilLongBreak") {
      setPreferences({
        ...preferences,
        pomodorosUntilLongBreak: newValue,
      });
    } else {
      setPreferences({
        ...preferences,
        modes: {
          ...preferences.modes,
          [preferenceName]: {
            ...preferences.modes[preferenceName],
            duration: newValue,
          },
        },
      });
    }
  };

  /*
   * This function modifies modes duration (Work/Short Break/Long Break)
   * @param the mode to change
   * @param the number of seconds to add/subtract (depends if it's positive or negative)
   */
  const handleChange = (value: number) => {
    const currentValue = getCurrentValue(preferenceName);
    const newValue = currentValue + value;
    // check if new value is valid
    if (newValue >= minMax[0] && newValue <= minMax[1]) {
      changeCurrentValue(newValue);
    }
  };

  return (
    <View style={numberInputStyles.container}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={numberInputStyles.btnContainer}>
        <TouchableOpacity
          style={numberInputStyles.btn}
          onPress={() => handleChange(-step)} // subtracts the step
        >
          <Text style={numberInputStyles.btnSymbol}>-</Text>
        </TouchableOpacity>

        <Text style={numberInputStyles.btnValue}>
          {/* edge case for pomodoros until long break input */}
          {formatToMinutes
            ? formatTime(getCurrentValue(preferenceName)).minutes
            : getCurrentValue(preferenceName)}
        </Text>

        <TouchableOpacity
          style={numberInputStyles.btn}
          onPress={() => handleChange(step)} // adds the step
        >
          <Text style={numberInputStyles.btnSymbol}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

// FIX: must be at least 5px between switcher and switchContainer
const switchInputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  switchContainer: {
    width: 80 + 8, // For some reason the extra must be 8 and not 4
    height: 50,
    position: "relative",
    padding: 2,
    borderRadius: 999,
    backgroundColor: "#000",
  },
  switcher: {
    width: 40,
    height: 40,
    top: 5, // This one izi cause it's parent height is 50
    left: 4, // For some reason must be 4 and not 2
    overflow: "hidden",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#fff",
  },
});

const numberInputStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  btnContainer: {
    width: 150,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 999,
    padding: 5, // don't know why works
  },
  btn: {
    borderRadius: 125,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnValue: {
    fontSize: 24,
    textAlign: "center",
    width: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  btnSymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});
