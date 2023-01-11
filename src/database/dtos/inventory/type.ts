interface DbInventoryChampion {
  name: string;
  count: number;
  icon: string;
  cost: number;
  stats: {
    armor: number;
    damage: number;
    hp: number;
    magicResist: number;
  };
  ability: {
    name: string;
    desc: string;
    icon: string;
  };
}

export interface DbInventory {
  _id: string;
  champions: DbInventoryChampion[];
  mainChampion: DbInventoryChampion;
}
