import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_PREFERENCES } from "../constans";

interface PreferencesContextType {
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
  isSettingsOpen: boolean;
  toggleSettings: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined,
);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] =
    useState<Preferences>(DEFAULT_PREFERENCES);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const value = {
    preferences,
    setPreferences,
    isSettingsOpen,
    toggleSettings,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferencesContext() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error(
      "usePreferencesContext must be used within a PreferencesProvider",
    );
  }
  return context;
}
