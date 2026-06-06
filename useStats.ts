"use client";

import { useState, useEffect } from "react";

interface DayStats {
  date: string; // YYYY-MM-DD
  totalSeconds: number;
  sessions: number;
}

const STORAGE_KEY = "swm_stats";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function useStats() {
  const [stats, setStats] = useState<DayStats>({
    date: todayKey(),
    totalSeconds: 0,
    sessions: 0,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: DayStats = JSON.parse(stored);
        if (parsed.date === todayKey()) {
          setStats(parsed);
        }
        // If it's a new day, start fresh (default state already handles this)
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {}
  }, [stats, loaded]);

  const addStudyTime = (seconds: number) => {
    setStats((prev) => ({
      date: todayKey(),
      totalSeconds: prev.date === todayKey() ? prev.totalSeconds + seconds : seconds,
      sessions: prev.date === todayKey() ? prev.sessions + 1 : 1,
    }));
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  return {
    totalSeconds: stats.totalSeconds,
    sessions: stats.sessions,
    formattedTime: formatDuration(stats.totalSeconds),
    addStudyTime,
  };
}
