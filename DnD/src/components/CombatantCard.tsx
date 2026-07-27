import { useState } from "react";
import { Minus, Plus, Trash2, Shield, X } from "lucide-react";
import type { Combatant, Condition } from "./types";

const ALL_CONDITIONS: Condition[] = [
  "blinded", "charmed", "deafened", "frightened", "grappled",
  "incapacitated", "invisible", "paralyzed", "petrified", "poisoned",
  "prone", "restrained", "stunned", "unconscious",
];

interface CombatantCardProps {
  combatant: Combatant;
  isActive: boolean;
  turnIndex: number;
  onHpChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onAddCondition: (id: string, condition: Condition) => void;
  onRemoveCondition: (id: string, condition: Condition) => void;
}

export function CombatantCard({ combatant, isActive, onHpChange, onRemove, onAddCondition, onRemoveCondition }: CombatantCardProps) {
  const [pickingCondition, setPickingCondition] = useState(false);
  const isDead = combatant.hp <= 0;
  const hpPct = Math.round((combatant.hp / combatant.maxHp) * 100);
  const typeColor = combatant.type === "player" ? "#6b9bde" : "#d47070";

  return (
    <div
      className="rounded-lg border p-3 transition-all"
      style={{
        background: "var(--card)",
        borderColor: isActive ? "var(--primary)" : "rgba(200,150,12,0.2)",
        boxShadow: isActive ? "0 0 0 1px var(--primary)" : "none",
        opacity: isDead ? 0.5 : 1,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="rounded px-1.5 py-0.5 shrink-0"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", background: "var(--secondary)", color: typeColor }}
          >
            {combatant.initiative}
          </span>
          <span
            className="truncate"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.95rem", color: isDead ? "var(--muted-foreground)" : "var(--foreground)" }}
          >
            {combatant.name}
          </span>
          {isDead && (
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#d47070" }}>DEAD</span>
          )}
        </div>
        <button
          onClick={() => onRemove(combatant.id)}
          className="shrink-0 rounded p-1 transition-colors hover:text-red-400"
          style={{ color: "var(--muted-foreground)" }}
          title="Remove combatant"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onHpChange(combatant.id, -1)}
            className="rounded p-1 transition-colors hover:brightness-110 active:scale-[0.95]"
            style={{ background: "var(--secondary)", color: "var(--foreground)" }}
          >
            <Minus size={12} />
          </button>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--foreground)", minWidth: "3.5rem", textAlign: "center" }}>
            {combatant.hp}/{combatant.maxHp}
          </span>
          <button
            onClick={() => onHpChange(combatant.id, 1)}
            className="rounded p-1 transition-colors hover:brightness-110 active:scale-[0.95]"
            style={{ background: "var(--secondary)", color: "var(--foreground)" }}
          >
            <Plus size={12} />
          </button>
        </div>

        <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: "var(--secondary)" }}>
          <div
            className="h-full transition-all"
            style={{ width: `${Math.max(0, hpPct)}%`, background: hpPct > 50 ? "#4d8a5c" : hpPct > 20 ? "#c8960c" : "#c0392b" }}
          />
        </div>

        <div className="flex items-center gap-1 shrink-0" style={{ color: "var(--muted-foreground)" }}>
          <Shield size={12} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>{combatant.ac}</span>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1">
        {combatant.conditions.map((c) => (
          <button
            key={c}
            onClick={() => onRemoveCondition(combatant.id, c)}
            className="flex items-center gap-1 rounded-full px-2 py-0.5 transition-colors hover:brightness-110"
            style={{ background: "rgba(170,59,255,0.12)", color: "#c084fc", fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace" }}
            title="Remove condition"
          >
            {c} <X size={10} />
          </button>
        ))}

        {pickingCondition ? (
          <select
            autoFocus
            defaultValue=""
            onChange={(e) => {
              const value = e.target.value as Condition;
              if (value) onAddCondition(combatant.id, value);
              setPickingCondition(false);
            }}
            onBlur={() => setPickingCondition(false)}
            className="rounded px-1.5 py-0.5"
            style={{ background: "var(--secondary)", color: "var(--foreground)", fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", border: "1px solid rgba(200,150,12,0.3)" }}
          >
            <option value="" disabled>
              add condition…
            </option>
            {ALL_CONDITIONS.filter((c) => !combatant.conditions.includes(c)).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        ) : (
          <button
            onClick={() => setPickingCondition(true)}
            className="rounded-full px-2 py-0.5 transition-colors hover:brightness-110"
            style={{ background: "var(--secondary)", color: "var(--muted-foreground)", fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace" }}
          >
            + condition
          </button>
        )}
      </div>
    </div>
  );
}
