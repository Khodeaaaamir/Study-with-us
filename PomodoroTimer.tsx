"use client";

import { usePomodoro } from "@/hooks/usePomodoro";

interface Props {
  onFocusComplete: (seconds: number) => void;
}

const CIRCUMFERENCE = 2 * Math.PI * 54; // r=54

export default function PomodoroTimer({ onFocusComplete }: Props) {
  const {
    mode,
    formattedTime,
    isRunning,
    sessionsCompleted,
    progress,
    start,
    pause,
    reset,
    switchMode,
  } = usePomodoro(onFocusComplete);

  const offset = CIRCUMFERENCE * (1 - progress);
  const isFocus = mode === "focus";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Mode tabs */}
      <div
        className="flex gap-1 p-1 rounded-lg"
        style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
      >
        {(["focus", "break"] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className="px-5 py-1.5 rounded-md text-xs font-mono uppercase tracking-widest transition-all duration-200"
            style={{
              background: mode === m ? "var(--border-bright)" : "transparent",
              color: mode === m ? "var(--text)" : "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {m === "focus" ? "Focus" : "Break"}
          </button>
        ))}
      </div>

      {/* Ring timer */}
      <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
        {/* Outer glow */}
        {isRunning && (
          <div
            className="absolute inset-0 rounded-full animate-pulse-slow"
            style={{
              background: isFocus ? "var(--accent-glow)" : "var(--green-glow)",
              filter: "blur(20px)",
              transform: "scale(1.2)",
            }}
          />
        )}

        <svg width="160" height="160" viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
          {/* Track */}
          <circle cx="60" cy="60" r="54" className="ring-track" />
          {/* Progress */}
          <circle
            cx="60"
            cy="60"
            r="54"
            className={`ring-fill ${!isFocus ? "ring-fill-break" : ""}`}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>

        {/* Time display */}
        <div className="relative text-center z-10">
          <div
            className="text-4xl font-mono tabular-nums leading-none"
            style={{
              fontFamily: "var(--font-mono)",
              color: isFocus ? "var(--accent)" : "var(--green)",
              letterSpacing: "-0.02em",
            }}
          >
            {formattedTime}
          </div>
          <div
            className="text-xs mt-1 uppercase tracking-widest"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            {isFocus ? "focus" : "rest"}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
          title="Reset"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        <button
          onClick={isRunning ? pause : start}
          className="px-8 py-2.5 rounded-lg font-mono text-sm uppercase tracking-widest transition-all duration-150 hover:scale-105 active:scale-95"
          style={{
            background: isFocus ? "var(--accent)" : "var(--green)",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            boxShadow: isRunning
              ? "none"
              : isFocus
              ? "0 4px 20px rgba(123,110,246,0.3)"
              : "0 4px 20px rgba(74,222,128,0.25)",
          }}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>

      {/* Session count */}
      {sessionsCompleted > 0 && (
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          <div className="flex gap-1">
            {Array.from({ length: Math.min(sessionsCompleted, 8) }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)", opacity: 0.7 }}
              />
            ))}
          </div>
          <span>{sessionsCompleted} session{sessionsCompleted !== 1 ? "s" : ""} today</span>
        </div>
      )}
    </div>
  );
}
