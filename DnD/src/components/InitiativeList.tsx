import { Swords } from "lucide-react";
import type { Combatant, Condition } from "./types";
import { CombatantCard } from "./CombatantCard";

interface InitiativeListProps {
  combatants: Combatant[];
  currentTurn: number;
  onHpChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onAddCondition: (id: string, condition: Condition) => void;
  onRemoveCondition: (id: string, condition: Condition) => void;
}

export function InitiativeList({ combatants, currentTurn, onHpChange, onRemove, onAddCondition, onRemoveCondition }: InitiativeListProps) {
  if (combatants.length === 0) {
    return (
      <div className="rounded-lg border py-12 text-center" style={{ borderColor: "rgba(200,150,12,0.15)", background: "var(--card)" }}>
        <Swords size={32} style={{ color: "var(--muted-foreground)", margin: "0 auto 0.75rem" }} />
        <p style={{ color: "var(--muted-foreground)", fontFamily: "'Cinzel', serif", fontSize: "0.9rem" }}>
          No combatants. Add players and monsters to begin.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {combatants.map((c, i) => (
        <CombatantCard
          key={c.id}
          combatant={c}
          isActive={i === currentTurn}
          turnIndex={i}
          onHpChange={onHpChange}
          onRemove={onRemove}
          onAddCondition={onAddCondition}
          onRemoveCondition={onRemoveCondition}
        />
      ))}
    </div>
  );
}