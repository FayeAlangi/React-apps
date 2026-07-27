export type CombatantType = "player" | "monster";

export type Condition =
  | "blinded"
  | "charmed"
  | "deafened"
  | "frightened"
  | "grappled"
  | "incapacitated"
  | "invisible"
  | "paralyzed"
  | "petrified"
  | "poisoned"
  | "prone"
  | "restrained"
  | "stunned"
  | "unconscious";

export interface Combatant {
  id: string;
  name: string;
  type: CombatantType;
  initiative: number;
  hp: number;
  maxHp: number;
  ac: number;
  conditions: Condition[];
}
