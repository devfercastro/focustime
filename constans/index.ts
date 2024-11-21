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
  workSessionsCompleted: 0,
  timeLeft: MODES.WORK.duration,
  mode: MODES.WORK,
};
