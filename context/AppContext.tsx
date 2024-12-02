import type { ReactNode } from "react";
import { PreferencesProvider } from "./PreferencesContext";
import { TimerProvider } from "./TimerContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <PreferencesProvider>
      <TimerProvider>{children}</TimerProvider>
    </PreferencesProvider>
  );
}
