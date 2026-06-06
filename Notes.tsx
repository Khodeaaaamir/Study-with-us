"use client";

import { useState } from "react";
import { useNotes } from "@/hooks/useNotes";

export default function Notes() {
  const { notes, addNote, deleteNote } = useNotes();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      addNote(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h2
          className="text-xs uppercase tracking-widest"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          Notes
        </h2>
        {notes.length > 0 && (
          <span
            className="text-xs"
            style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}
          >
            {notes.length}
          </span>
        )}
      </div>

      {/* Input */}
      <div
        className="flex gap-2 p-1 rounded-lg"
        style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Quick note... (Enter to save)"
          rows={1}
          className="flex-1 bg-transparent text-sm resize-none px-2 py-2 outline-none placeholder:opacity-30"
          style={{
            color: "var(--text)",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
          }}
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className="self-start mt-1 mr-1 w-7 h-7 rounded flex items-center justify-center transition-all duration-150 disabled:opacity-20 hover:scale-105 active:scale-95"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Notes list */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-0.5">
        {notes.length === 0 ? (
          <div
            className="text-center py-8 text-xs"
            style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}
          >
            no notes yet
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="note-item group flex gap-2 p-3 rounded-lg"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="w-1 rounded-full self-stretch flex-shrink-0"
                style={{ background: "var(--accent)", opacity: 0.4 }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm leading-relaxed break-words"
                  style={{ color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "13px" }}
                >
                  {note.text}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}
                >
                  {formatDate(note.createdAt)}
                </p>
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded flex items-center justify-center transition-all duration-150 flex-shrink-0 hover:scale-110 active:scale-95"
                style={{ color: "var(--text-dim)" }}
                title="Delete note"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
