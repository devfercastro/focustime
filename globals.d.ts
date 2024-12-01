type Mode = {
  name: "work" | "shortBreak" | "longBreak";
  label: string;
  duration: number;
};

type Modes = {
  WORK: Mode;
  SHORT_BREAK: Mode;
  LONG_BREAK: Mode;
};

interface Preferences {
  modes: Modes;
  autoStartNextMode: boolean;
  pomodorosUntilLongBreak: number;
}

interface TimerState {
  isRunning: boolean;
  timeLeft: number;
  mode: Mode;
  pomodorosCount: number;
  pomodorosUntilLongBreak: number;
}

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
}
