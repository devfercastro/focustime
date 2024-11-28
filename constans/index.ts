export const MODES: Modes = {
  WORK: {
    name: "work",
    label: "Work",
    duration: 25 * 60,
  },
  SHORT_BREAK: {
    name: "shortBreak",
    label: "Short Break",
    duration: 5 * 60,
  },
  LONG_BREAK: {
    name: "longBreak",
    label: "Long Break",
    duration: 15 * 60,
  },
};

export const DEFAULT_PREFERENCES: Preferences = {
  autoStartNextMode: true,
  modes: MODES,
  pomodorosUntilLongBreak: 4,
};
