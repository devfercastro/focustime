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

export default function Settings({ isVisible, setIsVisible }: SettingsProps) {
  const translateX = useRef(new Animated.Value(-screenWidth)).current;
  const [autoStart, setAutoStart] = useState<boolean>(true);
  const [minutes, setMinutes] = useState<number>(10);

  const changeMinutes = (value: number) => {
    setMinutes(value);
  };

  const increment = () => {
    setMinutes((prevState) => prevState + 1);
  };

  const decrement = () => {
    setMinutes((prevState) => prevState - 1);
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
        value={minutes}
        increment={increment}
        decrement={decrement}
      />
      <NumberInput
        label="Short break duration:"
        value={minutes}
        increment={increment}
        decrement={decrement}
      />
      <NumberInput
        label="Long break duration:"
        value={minutes}
        increment={increment}
        decrement={decrement}
      />
      <NumberInput
        label="Pomodoros until long break:"
        value={minutes}
        increment={increment}
        decrement={decrement}
      />
      <SwitchInput
        label="Autostart:"
        isChecked={autoStart}
        onChange={() => setAutoStart(!autoStart)}
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
