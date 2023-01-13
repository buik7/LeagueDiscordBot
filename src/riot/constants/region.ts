export enum Regions {
  VIETNAM = "VN2",
  SINGAPORE = "SG2",
  THAILAND = "TH2",
  TAIWAN = "TW2",
  PHILIPPINES = "PH2",
  BRAZIL = "BR1",
  EU_EAST = "EUN1",
  EU_WEST = "EUW1",
  KOREA = "KR",
  LAT_NORTH = "LA1",
  LAT_SOUTH = "LA2",
  AMERICA_NORTH = "NA1",
  OCEANIA = "OC1",
  TURKEY = "TR1",
  RUSSIA = "RU",
  JAPAN = "JP1",
  PBE = "PBE1",
}

export enum RegionGroups {
  ASIA = "ASIA",
  AMERICAS = "AMERICAS",
  EUROPE = "EUROPE",
  SEA = "SEA",
}

export function regionToRegionGroup(region: Regions): RegionGroups {
  switch (region) {
    // America
    case Regions.AMERICA_NORTH:
    case Regions.BRAZIL:
    case Regions.LAT_NORTH:
    case Regions.LAT_SOUTH:
      return RegionGroups.AMERICAS;
    // Europe
    case Regions.EU_EAST:
    case Regions.EU_WEST:
    case Regions.TURKEY:
    case Regions.RUSSIA:
      return RegionGroups.EUROPE;
    // Asia
    case Regions.JAPAN:
    case Regions.KOREA:
      return RegionGroups.ASIA;
    // Sea
    case Regions.VIETNAM:
    case Regions.SINGAPORE:
    case Regions.OCEANIA:
    case Regions.PHILIPPINES:
    case Regions.THAILAND:
    case Regions.TAIWAN:
      return RegionGroups.SEA;
  }
  throw new Error(`Unexpected region: ${region}`);
}

interface IRegionProps {
  [key: string]: string;
}

export const regionProps: IRegionProps = {
  [Regions.VIETNAM]: "Vietnam",
  [Regions.SINGAPORE]: "Singapore",
  [Regions.THAILAND]: "Thailand",
  [Regions.TAIWAN]: "Taiwan",
  [Regions.PHILIPPINES]: "Phillipines",
  [Regions.BRAZIL]: "Brazil",
  [Regions.EU_EAST]: "European East",
  [Regions.EU_WEST]: "European West",
  [Regions.KOREA]: "Korea",
  [Regions.LAT_NORTH]: "Latin North",
  [Regions.LAT_SOUTH]: "Latin South",
  [Regions.AMERICA_NORTH]: "North America",
  [Regions.OCEANIA]: "Oceania",
  [Regions.TURKEY]: "Turkey",
  [Regions.RUSSIA]: "Russia",
  [Regions.JAPAN]: "Japan",
};
