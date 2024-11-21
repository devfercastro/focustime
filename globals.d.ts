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
