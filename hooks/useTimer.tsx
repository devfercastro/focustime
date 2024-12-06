import { useEffect, useState } from "react";

// TODO: change to a minor value to a more smooth progress bar animation (prefered 16ms for 60fps or 33ms for 30fps)
// in case of change it update how `timeLeft` is subtracted
const TIMER_DELAY = 1000;

interface UseTimerParams extends Preferences {}

export default function useTimer({
  modes,
  pomodorosUntilLongBreak,
  autoStartNextMode,
}: UseTimerParams) {
  // TODO: this sucks, implement a design patter, PLEASEEE
  // check TimerState interface for more info
  const DEFAULT_TIMER_STATE: TimerState = {
    isRunning: false,
    timeLeft: modes.POMODORO.duration,
    mode: modes.POMODORO,
    pomodoroIndex: 1,
    pomodorosUntilLongBreak,
    isReseted: true,
  };

  const [timerState, setTimerState] = useState<TimerState>(DEFAULT_TIMER_STATE);

  // hook that runs when modes or pomodorosUntilLongBreak preferences are changed. This is to reflect when user makes changes from settings panel
  useEffect(() => {
    // If the preferences are changed, reflect that change
    setTimerState((prevState) => ({
      ...prevState,
      // Update the timeLeft
      timeLeft:
        modes[prevState.mode.name.toUpperCase() as keyof Modes].duration,
      mode: modes[prevState.mode.name.toUpperCase() as keyof Modes],
      // Update pomodoros until long break
      pomodorosUntilLongBreak,
    }));
  }, [modes, pomodorosUntilLongBreak]);

  // main timer hook
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // if the timer is running and there's still time left
    if (timerState.isRunning && timerState.timeLeft > 0) {
      // start the interval
      interval = setInterval(() => {
        setTimerState((prevState) => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1, // subtract 1 second from the time left
        }));
      }, TIMER_DELAY);
    }
    // if there's no time left change the current mode
    else if (timerState.timeLeft === 0) {
      handleModeTransition();
    }

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.timeLeft]);

  /*
   * Handles mode transition/changing
   */
  const handleModeTransition = () => {
    // if user has disabled auto start next mode, stop the timer
    if (!autoStartNextMode) {
      setTimerState((prevState) => ({
        ...prevState,
        isRunning: false,
      }));
    }

    // on pomodoro mode, changes to short/long break
    if (timerState.mode.name === "pomodoro") {
      // change to short break if is not the last pomodoro
      if (timerState.pomodoroIndex < timerState.pomodorosUntilLongBreak) {
        setTimerState((prevState) => ({
          ...prevState,
          mode: modes.SHORT_BREAK, // set mode to short break
          timeLeft: modes.SHORT_BREAK.duration, // reset the time left to short break duration
        }));
      }
      // change to long break if is the last pomodoro
      else {
        setTimerState((prevState) => ({
          ...prevState,
          mode: modes.LONG_BREAK, // set mode to long break
          timeLeft: modes.LONG_BREAK.duration, // reset the time left to long break duration
        }));
      }
    }
    // on short/long break mode, changes to pomodoro
    else {
      setTimerState((prevState) => ({
        ...prevState,
        mode: modes.POMODORO, // set mode to pomodoro
        timeLeft: modes.POMODORO.duration, // reset the time left to pomodoro duration
        pomodoroIndex:
          prevState.mode.name === "longBreak" // on long break mode
            ? 1 // reset the pomodoro session index to 1
            : prevState.pomodoroIndex + 1, // otherwise (means short break mode) increment the pomodoro session index
      }));
    }
  };

  /*
   * Handles timer start/pause
   */
  const handleStartPause = () => {
    setTimerState((prevState) => ({
      ...prevState,
      isRunning: !prevState.isRunning,
      isReseted: false, // to forbidde the user from changing preferences once session it's started
    }));
  };

  /*
   * Handles timer reset
   */
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
