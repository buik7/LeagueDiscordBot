export enum Tiers {
  CHALLENGER = "CHALLENGER",
  GRANDMASTER = "GRANDMASTER",
  MASTER = "MASTER",
  DIAMOND = "DIAMOND",
  PLATINUM = "PLATINUM",
  GOLD = "GOLD",
  SILVER = "SILVER",
  BRONZE = "BRONZE",
  IRON = "IRON",
}

export function getTierDiscordIcon(tier: Tiers): string {
  switch (tier) {
    case Tiers.CHALLENGER:
      return "<:challenger:1062468891135193108>";

    case Tiers.GRANDMASTER:
      return "<:grandmaster:1062468873326170122>";

    case Tiers.MASTER:
      return "<:master:1062468859887616112>";

    case Tiers.DIAMOND:
      return "<:diamond:1062468834881192066>";

    case Tiers.PLATINUM:
      return "<:platinum:1062468736122110022>";

    case Tiers.GOLD:
      return "<:gold:1062468707634393188>";

    case Tiers.SILVER:
      return "<:silver:1062468690278367333>";

    case Tiers.BRONZE:
      return "<:bronze:1062468629720997990>";

    case Tiers.IRON:
      return "<:iron:1062468669894041600>";

    default: /* Unranked */
      return "<:unranked:1062477792131956797>";
  }
}
