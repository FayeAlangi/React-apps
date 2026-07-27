import { useState } from "react";
import type { Combatant, Condition } from "../components/types";

export function useCombatTracker() {
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [round, setRound] = useState(1);

  const sorted = [...combatants].sort((a, b) => b.initiative - a.initiative);

  function nextTurn() {
    const next = currentTurn + 1;
    if (next >= sorted.length) {
      setCurrentTurn(0);
      setRound((r) => r + 1);
    } else {
      setCurrentTurn(next);
    }
  }

  function prevTurn() {
    const prev = currentTurn - 1;
    if (prev < 0) {
      if (round > 1) {
        setRound((r) => r - 1);
        setCurrentTurn(sorted.length - 1);
      }
    } else {
      setCurrentTurn(prev);
    }
  }

  function resetCombat() {
    setCurrentTurn(0);
    setRound(1);
  }

  function handleHpChange(id: string, delta: number) {
    setCombatants((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, hp: Math.max(0, Math.min(c.maxHp, c.hp + delta)) } : c
      )
    );
  }

  function handleRemove(id: string) {
    setCombatants((prev) => prev.filter((c) => c.id !== id));
    setCurrentTurn(0);
  }

  function handleAddCondition(id: string, condition: Condition) {
    setCombatants((prev) =>
      prev.map((c) =>
        c.id === id && !c.conditions.includes(condition)
          ? { ...c, conditions: [...c.conditions, condition] }
          : c
      )
    );
  }

  function handleRemoveCondition(id: string, condition: Condition) {
    setCombatants((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, conditions: c.conditions.filter((x) => x !== condition) } : c
      )
    );
  }

  function handleAdd(c: Omit<Combatant, "id" | "conditions">) {
    const id = String(Date.now());
    setCombatants((prev) => [...prev, { ...c, id, conditions: [] }]);
  }

  const activeCombatant = sorted[currentTurn];
  const players = combatants.filter((c) => c.type === "player");
  const monsters = combatants.filter((c) => c.type === "monster");
  const dead = combatants.filter((c) => c.hp <= 0);

  return {
    sorted,
    currentTurn,
    round,
    activeCombatant,
    players,
    monsters,
    dead,
    nextTurn,
    prevTurn,
    resetCombat,
    handleHpChange,
    handleRemove,
    handleAddCondition,
    handleRemoveCondition,
    handleAdd,
  };
}