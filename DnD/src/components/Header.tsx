import { Swords } from "lucide-react";

export function Header() {
  return (
    <header className="mb-6 text-center">
      <div className="flex items-center justify-center gap-3 mb-1">
        <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(200,150,12,0.5))" }} />
        <Swords size={20} style={{ color: "var(--primary)" }} />
        <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(200,150,12,0.5))" }} />
      </div>
      <h1 style={{ fontFamily: "'Cinzel', serif", color: "var(--primary)", letterSpacing: "0.12em", fontSize: "1.5rem" }}>
        INITIATIVE TRACKER
      </h1>
      <div className="flex items-center justify-center gap-3 mt-1">
        <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(200,150,12,0.3))" }} />
        <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace" }}>
          ⚔ D&D 5e ⚔
        </span>
        <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(200,150,12,0.3))" }} />
      </div>
    </header>
  );
}