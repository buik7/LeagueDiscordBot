export type RealmNTO = {
  item: string;
  rune: string;
  mastery: string;
  summoner: string;
  champion: string;
  profileicon: string;
  map: string;
  language: string;
  sticker: string;
};

export type RealmDTO = {
  n: RealmNTO;
  v: string;
  l: string;
  cdn: string;
  dd: string;
  lg: string;
  css: string;
  profileiconmax: number;
  store: string | null | object;
};

export type MapsDataDragonDTO = {
  mapId: string;
  mapName: string;
  notes: string;
};

export type QueuesDataDragonDTO = {
  queueId: number;
  map: string;
  description: string | null;
  notes: string | null;
};

export type RunesReforgedSlotsDTO = {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
};

export type RunesReforgedDTO = {
  id: number;
  key: string;
  icon: string;
  slots: {
    runes: RunesReforgedSlotsDTO[];
  };
};

export type GameTypesDataDragonDTO = {
  gametype: string;
  description: string;
};

export type GameModesDataDragonDTO = {
  gameMode: string;
  description: string;
};

export interface ChampionsDataDragonDetails {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: string[];
  partype: string;
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
}

export interface ChampionsDataDragonDetailsSolo
  extends ChampionsDataDragonDetails {
  lore: string;
  skins: {
    id: string;
    num: number;
    name: string;
    chromas: boolean;
  }[];
  allytips: string[];
  enemytips: string[];
  spells: {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    leveltip: {
      label: string[];
      effect: string[];
    };
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: any;
    effect: (null | number[])[];
    effectBurn: null | string;
    vars: {
      link: string;
      coeff: number;
      key: string;
    }[];
    costType: string;
    maxamo: string;
    range: number[];
    rangeBurn: string;
    resource: string;
  };
  passive: {
    name: string;
    description: string;
    image: {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };
  };
  recommended: {
    champion: string;
    title: string;
    type: string;
    map: string;
    mode: string;
    priority: boolean;
    blocks: {
      type: string;
      maxSummonerLevel: number;
      items: {
        id: string;
        count: number;
      }[];
    }[];
  }[];
}

export type ChampionsDataDragon = {
  readonly type: string;
  readonly format: string;
  readonly version: string;
  readonly data: {
    [key: string]: ChampionsDataDragonDetails;
  };
};
