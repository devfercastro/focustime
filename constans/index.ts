export const MODES: Modes = {
  POMODORO: {
    name: "pomodoro",
    label: "POMODORO",
    // duration: 25 * 60,
    duration: 10, // for testing
  },
  SHORT_BREAK: {
    name: "shortBreak",
    label: "SHORT BREAK",
    // duration: 5 * 60,
    duration: 10, // for testing
  },
  LONG_BREAK: {
    name: "longBreak",
    label: "LONG BREAK",
    // duration: 15 * 60,
    duration: 10, // for testing
  },
};

export const DEFAULT_PREFERENCES: Preferences = {
  autoStartNextMode: true,
  modes: MODES,
  pomodorosUntilLongBreak: 4,
};
