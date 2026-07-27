import { Skull } from "lucide-react";
import type { Combatant } from "./types";

export function DeathNotice({ fallen }: { fallen: Combatant[] }) {
  if (fallen.length === 0) return null;

  return (
    <div className="mb-4 rounded border px-3 py-2 flex items-center gap-2" style={{ background: "rgba(139,26,26,0.15)", borderColor: "rgba(139,26,26,0.4)" }}>
      <Skull size={14} style={{ color: "#d47070" }} />
      <span style={{ color: "#d47070", fontSize: "0.85rem", fontFamily: "'Cinzel', serif", letterSpacing: "0.04em" }}>
        {fallen.length} fallen — {fallen.map((c) => c.name).join(", ")}
      </span>
    </div>
  );
}