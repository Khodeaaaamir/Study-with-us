"use client";

interface Props {
  totalSeconds: number;
  sessions: number;
  formattedTime: string;
}

export default function Stats({ totalSeconds, sessions, formattedTime }: Props) {
  // Build a simple bar showing progress toward a daily goal (4 hours = 14400s)
  const DAILY_GOAL = 4 * 3600;
  const progressPct = Math.min((totalSeconds / DAILY_GOAL) * 100, 100);

  const goalHours = Math.floor(DAILY_GOAL / 3600);

  return (
    <div className="flex flex-col gap-4">
      <h2
        className="text-xs uppercase tracking-widest"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
      >
        Today
      </h2>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          label="Study time"
          value={totalSeconds > 0 ? formattedTime : "—"}
          accent="var(--accent)"
        />
        <StatCard
          label="Sessions"
          value={sessions > 0 ? sessions.toString() : "—"}
          accent="var(--green)"
        />
      </div>

      {/* Daily goal progress */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            Daily goal
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}
          >
            {Math.round(progressPct)}% of {goalHours}h
          </span>
        </div>

        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progressPct}%`,
              background:
                progressPct >= 100
                  ? "var(--green)"
                  : "linear-gradient(90deg, var(--accent), #a78bfa)",
              boxShadow:
                progressPct > 0
                  ? "0 0 8px rgba(123,110,246,0.4)"
                  : "none",
            }}
          />
        </div>

        {progressPct >= 100 && (
          <p
            className="text-xs text-center"
            style={{ color: "var(--green)", fontFamily: "var(--font-mono)" }}
          >
            ✦ daily goal reached
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div
      className="p-3 rounded-lg flex flex-col gap-1"
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
      }}
    >
      <span
        className="text-xs"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
      <span
        className="text-xl font-mono tabular-nums leading-none"
        style={{ color: accent, fontFamily: "var(--font-mono)" }}
      >
        {value}
      </span>
    </div>
  );
}
