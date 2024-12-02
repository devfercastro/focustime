import { TouchableOpacity, StyleSheet } from "react-native";
import { SettingsIcon } from "./Icons";

interface SettingsBtnProps {
  onPress: () => void;
  disabled?: boolean;
}

export const SettingsBtn = ({ onPress, disabled }: SettingsBtnProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <SettingsIcon width={40} height={40} color={disabled ? "#ccc" : "#000"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});
