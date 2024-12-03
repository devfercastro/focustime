import { StyleSheet, View } from "react-native";

import Timer from "./components/Timer";
import Settings from "./components/Settings";
import Controls from "./components/Controls";
import { SettingsBtn } from "./components/SettingsBtn";

import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <Settings />
        <Timer />
        <Controls />
        <SettingsBtn />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 50,
    position: "relative",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },

  controlsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 16,
    width: 80,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
