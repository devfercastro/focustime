import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";

interface SettingsProps {
  isVisible: boolean;
  setIsVisible: () => void;
}

const [screenHeight, screenWidth] = [
  Dimensions.get("window").height,
  Dimensions.get("window").width,
];

export default function Settings({ isVisible, setIsVisible }: SettingsProps) {
  return (
    <Animated.View
      style={[styles.container, { left: isVisible ? 0 : -screenWidth }]}
    >
      <Text>Settings is {isVisible}</Text>
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
