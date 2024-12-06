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
  timeLeft: number; // I think it's obvious
  mode: Mode; // the current timer mode
  pomodoroIndex: number; // the index of the current work session (non-zero index)
  pomodorosUntilLongBreak: number; // max number of prefered pomodoros until long break comes up

  isRunning: boolean; // to check if timer is running or it's paused
  // very important prop to differ if the timer is not paused (`isRunning === false`)
  // it's used to forvide the user from changing preferences until timer is restarted, not just paused
  isReseted: boolean;
}

// TODO: this should not be here
interface IconProps {
  color?: string;
  width?: number;
  height?: number;
}
