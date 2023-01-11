export type TftChampionDTO = {
  ability: {
    desc: string;
    icon: string;
    name: string;
  };
  apiName: string;
  cost: number;
  icon: string;
  name: string;
  stats: { armor: number; damage: number; hp: number; magicResist: number };
  traits: string[];
};
