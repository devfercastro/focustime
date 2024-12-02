import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import useTimer from "../hooks/useTimer";
import { usePreferencesContext } from "./PreferencesContext";

interface TimerContextType {
  timerState: TimerState;
  handleStartPause: () => void;
  handleReset: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const { preferences } = usePreferencesContext();
  const { timerState, handleStartPause, handleReset } = useTimer(preferences);

  const value = {
    timerState,
    handleStartPause,
    handleReset,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
}
