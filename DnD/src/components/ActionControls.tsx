import { ChevronRight, ChevronLeft, RotateCcw, Plus } from "lucide-react";

interface ActionControlsProps {
  onPrevTurn: () => void;
  onNextTurn: () => void;
  onAdd: () => void;
  onReset: () => void;
  prevDisabled: boolean;
}

export function ActionControls({ onPrevTurn, onNextTurn, onAdd, onReset, prevDisabled }: ActionControlsProps) {
  return (
    <div className="mb-5 flex gap-2">
      <button
        onClick={onPrevTurn}
        disabled={prevDisabled}
        className="flex items-center gap-1 rounded-lg px-3 py-3 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ background: "var(--secondary)", color: "var(--foreground)", border: "1px solid rgba(200,150,12,0.3)" }}
        title="Previous turn"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={onNextTurn}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 transition-all hover:brightness-110 active:scale-[0.98]"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "'Cinzel', serif", letterSpacing: "0.08em", fontSize: "0.85rem" }}
      >
        NEXT TURN <ChevronRight size={16} />
      </button>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg px-4 py-3 transition-colors hover:border-amber-500/60"
        style={{ background: "var(--secondary)", color: "var(--foreground)", border: "1px solid rgba(200,150,12,0.3)", fontFamily: "'Cinzel', serif", letterSpacing: "0.06em", fontSize: "0.8rem" }}
      >
        <Plus size={15} /> ADD
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 rounded-lg px-4 py-3 transition-colors hover:border-red-500/50"
        style={{ background: "var(--secondary)", color: "var(--muted-foreground)", border: "1px solid rgba(200,150,12,0.2)" }}
        title="Reset combat"
      >
        <RotateCcw size={15} />
      </button>
    </div>
  );
}