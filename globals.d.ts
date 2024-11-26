type Mode = {
  name: "work" | "shortBreak" | "longBreak";
  label: string;
  duration: number;
};

type AppState = {
  isRunning: boolean;
  autoStart: boolean;
  sessionsCompleted: number;
  timeLeft: number;
  mode: Mode;
};

type AppPreferences = {
  autoStart: boolean;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  pomodorosUntilLongBreak: number;
};
