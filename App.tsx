import { StyleSheet, View } from "react-native";

import Timer from "./components/Timer";
import Settings from "./components/Settings";
import Controls from "./components/Controls";
import { SettingsBtn } from "./components/SettingsBtn";
import WorkSessionsTracker from "./components/WorkSessionsTracker";

import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <Settings />
        <Timer />
        <WorkSessionsTracker />
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
});
