"use client";

import { useStats } from "@/hooks/useStats";
import PomodoroTimer from "@/components/PomodoroTimer";
import Notes from "@/components/Notes";
import Stats from "@/components/Stats";

export default function Home() {
  const { totalSeconds, sessions, formattedTime, addStudyTime } = useStats();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10 md:py-16">
      {/* Header */}
      <header className="mb-10 text-center animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            Study With Me
          </span>
        </div>
        <h1
          className="text-2xl md:text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-sans)", color: "var(--text)" }}
        >
          Deep work, simplified.
        </h1>
      </header>

      {/* Main grid */}
      <div
        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4 animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Left column: Timer + Stats */}
        <div className="flex flex-col gap-4">
          {/* Timer card */}
          <div
            className="glass rounded-2xl p-8 flex flex-col items-center"
            style={{
              boxShadow: "0 0 40px rgba(0,0,0,0.4)",
            }}
          >
            <PomodoroTimer onFocusComplete={addStudyTime} />
          </div>

          {/* Stats card */}
          <div className="glass rounded-2xl p-6">
            <Stats
              totalSeconds={totalSeconds}
              sessions={sessions}
              formattedTime={formattedTime}
            />
          </div>
        </div>

        {/* Right column: Notes */}
        <div
          className="glass rounded-2xl p-6 flex flex-col"
          style={{ minHeight: "400px", maxHeight: "600px" }}
        >
          <Notes />
        </div>
      </div>

      {/* Footer */}
      <footer
        className="mt-10 text-xs"
        style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}
      >
        stay focused · data saved locally
      </footer>
    </main>
  );
}
