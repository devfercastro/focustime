import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  Dimensions,
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
