import { TouchableOpacity, StyleSheet } from "react-native";
import { SettingsIcon } from "./Icons";

export const SettingsBtn = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <SettingsIcon width={40} height={40} />
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
