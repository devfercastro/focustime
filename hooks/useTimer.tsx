import { useEffect, useState } from "react";

const TIMER_DELAY = 100; // TODO: Change this to 1000 on production

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
  };

  const [timerState, setTimerState] = useState<TimerState>(DEFAULT_TIMER_STATE);

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
      if (timerState.pomodorosCount < pomodorosUntilLongBreak) {
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
          pomodorosCount: 0,
        }));
      }
    } else {
      setTimerState((prevState) => ({
        ...prevState,
        mode: modes.WORK,
        timeLeft: modes.WORK.duration,
        pomodorosCount: prevState.pomodorosCount + 1,
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
