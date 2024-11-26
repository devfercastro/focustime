export const MODES: { WORK: Mode; SHORT_BREAK: Mode; LONG_BREAK: Mode } = {
  WORK: {
    name: "work",
    label: "Work",
    duration: 25, // 25 seconds for testing
  },
  SHORT_BREAK: {
    name: "shortBreak",
    label: "Short Break",
    duration: 5, // 5 seconds for testing
  },
  LONG_BREAK: {
    name: "longBreak",
    label: "Long Break",
    duration: 15, // 15 seconds for testing
  },
};

export const DEFAULT_STATE: AppState = {
  isRunning: false,
  autoStart: false,
  sessionsCompleted: 0,
  timeLeft: MODES.WORK.duration,
  mode: MODES.WORK,
};

export const DEFAULT_PREFERENCES: AppPreferences = {
  autoStart: true,
  workDuration: MODES.WORK.duration,
  shortBreakDuration: MODES.SHORT_BREAK.duration,
  longBreakDuration: MODES.LONG_BREAK.duration,
  pomodorosUntilLongBreak: 4,
};
