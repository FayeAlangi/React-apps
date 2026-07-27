import { useState } from "react";
import { X } from "lucide-react";
import type { Combatant, CombatantType } from "./types";
import { MONSTER_BESTIARY } from "./monsterBestiary";

const CUSTOM_MONSTER = "__custom__";

interface AddCombatantModalProps {
  onAdd: (c: Omit<Combatant, "id" | "conditions">) => void;
  onClose: () => void;
}

export function AddCombatantModal({ onAdd, onClose }: AddCombatantModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<CombatantType>("player");
  const [preset, setPreset] = useState(CUSTOM_MONSTER);
  const [initiative, setInitiative] = useState("10");
  const [hp, setHp] = useState("10");
  const [ac, setAc] = useState("10");

  function handleTypeChange(next: CombatantType) {
    setType(next);
    setPreset(CUSTOM_MONSTER);
  }

  function handlePresetChange(value: string) {
    setPreset(value);
    if (value === CUSTOM_MONSTER) return;
    const monster = MONSTER_BESTIARY.find((m) => m.name === value);
    if (!monster) return;
    setName(monster.name);
    setHp(String(monster.hp));
    setAc(String(monster.ac));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const maxHp = Math.max(1, Number(hp) || 1);
    onAdd({
      name: name.trim(),
      type,
      initiative: Number(initiative) || 0,
      hp: maxHp,
      maxHp,
      ac: Number(ac) || 10,
    });
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--secondary)",
    color: "var(--foreground)",
    border: "1px solid rgba(200,150,12,0.3)",
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border p-5"
        style={{ background: "var(--card)", borderColor: "rgba(200,150,12,0.3)" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "var(--primary)", letterSpacing: "0.06em", fontSize: "1rem" }}>
            ADD COMBATANT
          </h2>
          <button type="button" onClick={onClose} style={{ color: "var(--muted-foreground)" }}>
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleTypeChange("player")}
              className="flex-1 rounded-lg py-2 transition-colors"
              style={{
                background: type === "player" ? "#6b9bde" : "var(--secondary)",
                color: type === "player" ? "#0a1220" : "var(--muted-foreground)",
                fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.06em",
              }}
            >
              PLAYER
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("monster")}
              className="flex-1 rounded-lg py-2 transition-colors"
              style={{
                background: type === "monster" ? "#d47070" : "var(--secondary)",
                color: type === "monster" ? "#2a0a0a" : "var(--muted-foreground)",
                fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.06em",
              }}
            >
              MONSTER
            </button>
          </div>

          {type === "monster" && (
            <label className="flex flex-col gap-1">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--muted-foreground)" }}>
                BESTIARY
              </span>
              <select
                value={preset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="rounded-lg px-3 py-2"
                style={{ ...inputStyle, fontFamily: "'Crimson Text', serif", fontSize: "0.9rem" }}
              >
                <option value={CUSTOM_MONSTER}>Custom monster…</option>
                {MONSTER_BESTIARY.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          <input
            autoFocus
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setPreset(CUSTOM_MONSTER);
            }}
            placeholder="Name"
            className="rounded-lg px-3 py-2"
            style={{ ...inputStyle, fontFamily: "'Crimson Text', serif", fontSize: "0.95rem" }}
          />

          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--muted-foreground)" }}>INIT</span>
              <input
                type="number"
                value={initiative}
                onChange={(e) => setInitiative(e.target.value)}
                className="rounded-lg px-2 py-2"
                style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", width: "100%" }}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--muted-foreground)" }}>HP</span>
              <input
                type="number"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="rounded-lg px-2 py-2"
                style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", width: "100%" }}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--muted-foreground)" }}>AC</span>
              <input
                type="number"
                value={ac}
                onChange={(e) => setAc(e.target.value)}
                className="rounded-lg px-2 py-2"
                style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", width: "100%" }}
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-1 rounded-lg py-2.5 transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "'Cinzel', serif", letterSpacing: "0.08em", fontSize: "0.85rem" }}
          >
            ADD TO INITIATIVE
          </button>
        </div>
      </form>
    </div>
  );
}
