import { useEffect, useState } from "react";

const TIMER_DELAY = 1000;

interface UseTimerParams extends Preferences {}

export default function useTimer({
  modes,
  pomodorosUntilLongBreak,
  autoStartNextMode,
}: UseTimerParams) {
  const DEFAULT_TIMER_STATE: TimerState = {
    isRunning: false,
    timeLeft: modes.WORK.duration,
    mode: modes.WORK,
    pomodorosCount: 0,
    pomodorosUntilLongBreak,
  };

  const [timerState, setTimerState] = useState<TimerState>(DEFAULT_TIMER_STATE);

  useEffect(() => {
    // If the preferences are changed and the timer is not running, reflect that change
    if (!timerState.isRunning)
      setTimerState((prevState) => ({
        ...prevState,
        // Update the timeLeft
        timeLeft:
          modes[prevState.mode.name.toUpperCase() as keyof Modes].duration,
        mode: modes[prevState.mode.name.toUpperCase() as keyof Modes],
        // Update pomodoros until long break
        pomodorosUntilLongBreak,
      }));
  }, [timerState.isRunning, modes, pomodorosUntilLongBreak]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState.isRunning && timerState.timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState((prevState) => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1,
        }));
      }, TIMER_DELAY);
    } else if (timerState.timeLeft === 0) {
      handleModeTransition();
    }

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.timeLeft]);

  const handleModeTransition = () => {
    if (!autoStartNextMode) {
      setTimerState((prevState) => ({
        ...prevState,
        isRunning: false,
      }));
    }

    if (timerState.mode.name === "work") {
      if (timerState.pomodorosUntilLongBreak > 0) {
        setTimerState((prevState) => ({
          ...prevState,
          mode: modes.SHORT_BREAK,
          timeLeft: modes.SHORT_BREAK.duration,
        }));
      } else {
        setTimerState((prevState) => ({
          ...prevState,
          mode: modes.LONG_BREAK,
          timeLeft: modes.LONG_BREAK.duration,
          pomodorosUntilLongBreak,
        }));
      }
    } else {
      setTimerState((prevState) => ({
        ...prevState,
        mode: modes.WORK,
        timeLeft: modes.WORK.duration,
        pomodorosCount: prevState.pomodorosCount + 1,
        pomodorosUntilLongBreak: prevState.pomodorosUntilLongBreak - 1,
      }));
    }
  };

  const handleStartPause = () => {
    setTimerState((prevState) => ({
      ...prevState,
      isRunning: !prevState.isRunning,
    }));
  };

  const handleReset = () => {
    setTimerState(DEFAULT_TIMER_STATE);
  };

  return {
    timerState,
    setTimerState,
    handleStartPause,
    handleReset,
  };
}
