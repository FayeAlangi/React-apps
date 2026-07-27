export interface MonsterPreset {
  name: string;
  hp: number;
  ac: number;
}

export const MONSTER_BESTIARY: MonsterPreset[] = [
  { name: "Goblin", hp: 7, ac: 15 },
  { name: "Kobold", hp: 5, ac: 12 },
  { name: "Giant Rat", hp: 7, ac: 12 },
  { name: "Orc", hp: 15, ac: 13 },
  { name: "Hobgoblin", hp: 11, ac: 18 },
  { name: "Skeleton", hp: 13, ac: 13 },
  { name: "Zombie", hp: 22, ac: 8 },
  { name: "Bandit", hp: 11, ac: 12 },
  { name: "Wolf", hp: 11, ac: 13 },
  { name: "Black Bear", hp: 19, ac: 11 },
  { name: "Giant Spider", hp: 26, ac: 14 },
  { name: "Ogre", hp: 59, ac: 11 },
  { name: "Owlbear", hp: 59, ac: 13 },
  { name: "Troll", hp: 84, ac: 15 },
];
