export const MODES: Modes = {
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

export const DEFAULT_PREFERENCES: Preferences = {
  autoStartNextMode: true,
  modes: MODES,
  pomodorosUntilLongBreak: 4,
};
