export const MODES: Modes = {
  WORK: {
    name: "work",
    label: "WORK",
    duration: 25 * 60,
    // duration: 25, // for testing 25 seconds
  },
  SHORT_BREAK: {
    name: "shortBreak",
    label: "SHORT BREAK",
    duration: 5 * 60,
    // duration: 5, // for testing 5 seconds
  },
  LONG_BREAK: {
    name: "longBreak",
    label: "LONG BREAK",
    duration: 15 * 60,
    // duration: 15, // for testing 15 seconds
  },
};

export const DEFAULT_PREFERENCES: Preferences = {
  autoStartNextMode: true,
  modes: MODES,
  pomodorosUntilLongBreak: 4,
};
