import { useState } from "react";
import { useCombatTracker } from "./hooks/useCombatTracker";
import { Header } from "./components/Header";
import { StatsBar } from "./components/StatsBar";
import { ActionControls } from "./components/ActionControls";
import { DeathNotice } from "./components/DeathNotice";
import { InitiativeList } from "./components/InitiativeList";
import { AddCombatantModal } from "./components/AddCombatantModal";

export default function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const {
    sorted, currentTurn, round, activeCombatant, players, monsters, dead,
    nextTurn, prevTurn, resetCombat, handleHpChange, handleRemove,
    handleAddCondition, handleRemoveCondition, handleAdd,
  } = useCombatTracker();

  function onAddCombatant(c: Parameters<typeof handleAdd>[0]) {
    handleAdd(c);
    setShowAddModal(false);
  }

  return (
    <div className="min-h-screen w-full" style={{ background: "var(--background)", fontFamily: "'Crimson Text', serif" }}>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='2' height='2' fill='%23fff'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-4 py-6">
        <Header />
        <StatsBar round={round} playersCount={players.length} monstersCount={monsters.length} activeName={activeCombatant?.name} />
        <ActionControls
          onPrevTurn={prevTurn}
          onNextTurn={nextTurn}
          onAdd={() => setShowAddModal(true)}
          onReset={resetCombat}
          prevDisabled={currentTurn === 0 && round === 1}
        />
        <DeathNotice fallen={dead} />
        <InitiativeList
          combatants={sorted}
          currentTurn={currentTurn}
          onHpChange={handleHpChange}
          onRemove={handleRemove}
          onAddCondition={handleAddCondition}
          onRemoveCondition={handleRemoveCondition}
        />
        <div className="mt-8 text-center">
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace" }}>
            May your rolls be true
          </p>
        </div>
      </div>
      {showAddModal && <AddCombatantModal onAdd={onAddCombatant} onClose={() => setShowAddModal(false)} />}
    </div>
  );
}