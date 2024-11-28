export const MODES: Modes = {
  WORK: {
    name: "work",
    label: "WORK",
    duration: 25 * 60,
  },
  SHORT_BREAK: {
    name: "shortBreak",
    label: "SHORT BREAK",
    duration: 5 * 60,
  },
  LONG_BREAK: {
    name: "longBreak",
    label: "LONG BREAK",
    duration: 15 * 60,
  },
};

export const DEFAULT_PREFERENCES: Preferences = {
  autoStartNextMode: true,
  modes: MODES,
  pomodorosUntilLongBreak: 4,
};
