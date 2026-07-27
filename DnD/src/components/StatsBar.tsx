import type { ReactNode } from "react";
import { Users, Skull } from "lucide-react";

interface StatsBarProps {
  round: number;
  playersCount: number;
  monstersCount: number;
  activeName?: string;
}

function StatCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border p-3 text-center" style={{ background: "var(--card)", borderColor: "rgba(200,150,12,0.2)" }}>
      {children}
    </div>
  );
}

function StatLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
      {children}
    </div>
  );
}

export function StatsBar({ round, playersCount, monstersCount, activeName }: StatsBarProps) {
  return (
    <div className="mb-4 grid grid-cols-3 gap-3">
      <StatCard>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.6rem", color: "var(--primary)", lineHeight: 1 }}>{round}</div>
        <StatLabel>ROUND</StatLabel>
      </StatCard>

      <StatCard>
        <div className="flex items-center justify-center gap-2">
          <Users size={14} style={{ color: "#6b9bde" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem", color: "#6b9bde" }}>{playersCount}</span>
          <span style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>vs</span>
          <Skull size={14} style={{ color: "#d47070" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem", color: "#d47070" }}>{monstersCount}</span>
        </div>
        <StatLabel>COMBATANTS</StatLabel>
      </StatCard>

      <StatCard>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", color: "var(--foreground)", lineHeight: 1.2 }}>
          {activeName ?? "—"}
        </div>
        <StatLabel>ACTIVE TURN</StatLabel>
      </StatCard>
    </div>
  );
}