"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type TimerMode = "focus" | "break";

export interface PomodoroState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  sessionsCompleted: number;
}

const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

export function usePomodoro(onFocusComplete: (seconds: number) => void) {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(0);

  const totalDuration = mode === "focus" ? FOCUS_DURATION : BREAK_DURATION;
  const progress = (totalDuration - timeLeft) / totalDuration;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        return 0;
      }
      return prev - 1;
    });
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearTimer();
    }
    return () => clearTimer();
  }, [isRunning, tick, clearTimer]);

  // Handle timer completion
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      clearTimer();
      setIsRunning(false);

      if (mode === "focus") {
        onFocusComplete(FOCUS_DURATION);
        setSessionsCompleted((s) => s + 1);
        // Auto-switch to break
        setMode("break");
        setTimeLeft(BREAK_DURATION);
      } else {
        // Auto-switch to focus
        setMode("focus");
        setTimeLeft(FOCUS_DURATION);
      }
    }
  }, [timeLeft, isRunning, mode, onFocusComplete, clearTimer]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? FOCUS_DURATION : BREAK_DURATION);
  }, [mode, clearTimer]);

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      clearTimer();
      setIsRunning(false);
      setMode(newMode);
      setTimeLeft(newMode === "focus" ? FOCUS_DURATION : BREAK_DURATION);
    },
    [clearTimer]
  );

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return {
    mode,
    timeLeft,
    isRunning,
    sessionsCompleted,
    progress,
    totalDuration,
    formattedTime: formatTime(timeLeft),
    start,
    pause,
    reset,
    switchMode,
  };
}
