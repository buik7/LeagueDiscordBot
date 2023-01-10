import { EmbedBuilder } from "@discordjs/builders";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import DiscordCommand from "../types/Command";
import { getEmojiEncoding } from "../utils/emoji";

const champions = [
  {
    id: -1,
    name: "NONE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png",
  },
  {
    id: 1,
    name: "ANNIE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/1.png",
  },
  {
    id: 2,
    name: "OLAF",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/2.png",
  },
  {
    id: 3,
    name: "GALIO",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/3.png",
  },
  {
    id: 4,
    name: "TWISTED_FATE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/4.png",
  },
  {
    id: 5,
    name: "XIN_ZHAO",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/5.png",
  },
  {
    id: 6,
    name: "URGOT",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/6.png",
  },
  {
    id: 7,
    name: "LEBLANC",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/7.png",
  },
  {
    id: 8,
    name: "VLADIMIR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/8.png",
  },
  {
    id: 9,
    name: "FIDDLE_STICKS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/9.png",
  },
  {
    id: 10,
    name: "KAYLE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/10.png",
  },
  {
    id: 11,
    name: "MASTER_YI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/11.png",
  },
  {
    id: 12,
    name: "ALISTAR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/12.png",
  },
  {
    id: 13,
    name: "RYZE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/13.png",
  },
  {
    id: 14,
    name: "SION",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/14.png",
  },
  {
    id: 15,
    name: "SIVIR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/15.png",
  },
  {
    id: 16,
    name: "SORAKA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/16.png",
  },
  {
    id: 17,
    name: "TEEMO",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/17.png",
  },
  {
    id: 18,
    name: "TRISTANA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/18.png",
  },
  {
    id: 19,
    name: "WARWICK",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/19.png",
  },
  {
    id: 20,
    name: "NUNU",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/20.png",
  },
  {
    id: 21,
    name: "MISS_FORTUNE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/21.png",
  },
  {
    id: 22,
    name: "ASHE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/22.png",
  },
  {
    id: 23,
    name: "TRYNDAMERE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/23.png",
  },
  {
    id: 24,
    name: "JAX",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/24.png",
  },
  {
    id: 25,
    name: "MORGANA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/25.png",
  },
  {
    id: 26,
    name: "ZILEAN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/26.png",
  },
  {
    id: 27,
    name: "SINGED",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/27.png",
  },
  {
    id: 28,
    name: "EVELYNN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/28.png",
  },
  {
    id: 29,
    name: "TWITCH",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/29.png",
  },
  {
    id: 30,
    name: "KARTHUS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/30.png",
  },
  {
    id: 31,
    name: "CHOGATH",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/31.png",
  },
  {
    id: 32,
    name: "AMUMU",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/32.png",
  },
  {
    id: 33,
    name: "RAMMUS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/33.png",
  },
  {
    id: 34,
    name: "ANIVIA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/34.png",
  },
  {
    id: 35,
    name: "SHACO",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/35.png",
  },
  {
    id: 36,
    name: "DR_MUNDO",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/36.png",
  },
  {
    id: 37,
    name: "SONA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/37.png",
  },
  {
    id: 38,
    name: "KASSADIN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/38.png",
  },
  {
    id: 39,
    name: "IRELIA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/39.png",
  },
  {
    id: 40,
    name: "JANNA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/40.png",
  },
  {
    id: 41,
    name: "GANGPLANK",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/41.png",
  },
  {
    id: 42,
    name: "CORKI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/42.png",
  },
  {
    id: 43,
    name: "KARMA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/43.png",
  },
  {
    id: 44,
    name: "TARIC",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/44.png",
  },
  {
    id: 45,
    name: "VEIGAR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/45.png",
  },
  {
    id: 48,
    name: "TRUNDLE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/48.png",
  },
  {
    id: 50,
    name: "SWAIN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/50.png",
  },
  {
    id: 51,
    name: "CAITLYN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/51.png",
  },
  {
    id: 53,
    name: "BLITZCRANK",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/53.png",
  },
  {
    id: 54,
    name: "MALPHITE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/54.png",
  },
  {
    id: 55,
    name: "KATARINA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/55.png",
  },
  {
    id: 56,
    name: "NOCTURNE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/56.png",
  },
  {
    id: 57,
    name: "MAOKAI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/57.png",
  },
  {
    id: 58,
    name: "RENEKTON",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/58.png",
  },
  {
    id: 59,
    name: "JARVAN_IV",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/59.png",
  },
  {
    id: 60,
    name: "ELISE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/60.png",
  },
  {
    id: 61,
    name: "ORIANNA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/61.png",
  },
  {
    id: 62,
    name: "MONKEY_KING",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/62.png",
  },
  {
    id: 63,
    name: "BRAND",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/63.png",
  },
  {
    id: 64,
    name: "LEE_SIN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/64.png",
  },
  {
    id: 67,
    name: "VAYNE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/67.png",
  },
  {
    id: 68,
    name: "RUMBLE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/68.png",
  },
  {
    id: 69,
    name: "CASSIOPEIA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/69.png",
  },
  {
    id: 72,
    name: "SKARNER",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/72.png",
  },
  {
    id: 74,
    name: "HEIMERDINGER",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/74.png",
  },
  {
    id: 75,
    name: "NASUS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/75.png",
  },
  {
    id: 76,
    name: "NIDALEE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/76.png",
  },
  {
    id: 77,
    name: "UDYR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/77.png",
  },
  {
    id: 78,
    name: "POPPY",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/78.png",
  },
  {
    id: 79,
    name: "GRAGAS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/79.png",
  },
  {
    id: 80,
    name: "PANTHEON",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/80.png",
  },
  {
    id: 81,
    name: "EZREAL",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/81.png",
  },
  {
    id: 82,
    name: "MORDEKAISER",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/82.png",
  },
  {
    id: 83,
    name: "YORICK",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/83.png",
  },
  {
    id: 84,
    name: "AKALI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/84.png",
  },
  {
    id: 85,
    name: "KENNEN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/85.png",
  },
  {
    id: 86,
    name: "GAREN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/86.png",
  },
  {
    id: 89,
    name: "LEONA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/89.png",
  },
  {
    id: 90,
    name: "MALZAHAR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/90.png",
  },
  {
    id: 91,
    name: "TALON",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/91.png",
  },
  {
    id: 92,
    name: "RIVEN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/92.png",
  },
  {
    id: 96,
    name: "KOG_MAW",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/96.png",
  },
  {
    id: 98,
    name: "SHEN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/98.png",
  },
  {
    id: 99,
    name: "LUX",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/99.png",
  },
  {
    id: 101,
    name: "XERATH",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/101.png",
  },
  {
    id: 102,
    name: "SHYVANA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/102.png",
  },
  {
    id: 103,
    name: "AHRI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/103.png",
  },
  {
    id: 104,
    name: "GRAVES",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/104.png",
  },
  {
    id: 105,
    name: "FIZZ",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/105.png",
  },
  {
    id: 106,
    name: "VOLIBEAR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/106.png",
  },
  {
    id: 107,
    name: "RENGAR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/107.png",
  },
  {
    id: 110,
    name: "VARUS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/110.png",
  },
  {
    id: 111,
    name: "NAUTILUS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/111.png",
  },
  {
    id: 112,
    name: "VIKTOR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/112.png",
  },
  {
    id: 113,
    name: "SEJUANI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/113.png",
  },
  {
    id: 114,
    name: "FIORA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/114.png",
  },
  {
    id: 115,
    name: "ZIGGS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/115.png",
  },
  {
    id: 117,
    name: "LULU",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/117.png",
  },
  {
    id: 119,
    name: "DRAVEN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/119.png",
  },
  {
    id: 120,
    name: "HECARIM",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/120.png",
  },
  {
    id: 121,
    name: "KHAZIX",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/121.png",
  },
  {
    id: 122,
    name: "DARIUS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/122.png",
  },
  {
    id: 126,
    name: "JAYCE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/126.png",
  },
  {
    id: 127,
    name: "LISSANDRA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/127.png",
  },
  {
    id: 131,
    name: "DIANA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/131.png",
  },
  {
    id: 133,
    name: "QUINN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/133.png",
  },
  {
    id: 134,
    name: "SYNDRA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/134.png",
  },
  {
    id: 136,
    name: "AURELION_SOL",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/136.png",
  },
  {
    id: 141,
    name: "KAYN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/141.png",
  },
  {
    id: 142,
    name: "ZOE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/142.png",
  },
  {
    id: 143,
    name: "ZYRA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/143.png",
  },
  {
    id: 145,
    name: "KAISA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/145.png",
  },
  {
    id: 147,
    name: "SERAPHINE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/147.png",
  },
  {
    id: 150,
    name: "GNAR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/150.png",
  },
  {
    id: 154,
    name: "ZAC",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/154.png",
  },
  {
    id: 157,
    name: "YASUO",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/157.png",
  },
  {
    id: 161,
    name: "VELKOZ",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/161.png",
  },
  {
    id: 163,
    name: "TALIYAH",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/163.png",
  },
  {
    id: 164,
    name: "CAMILLE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/164.png",
  },
  {
    id: 166,
    name: "AKSHAN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/166.png",
  },
  {
    id: 200,
    name: "BELVETH",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/200.png",
  },
  {
    id: 201,
    name: "BRAUM",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/201.png",
  },
  {
    id: 202,
    name: "JHIN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/202.png",
  },
  {
    id: 203,
    name: "KINDRED",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/203.png",
  },
  {
    id: 221,
    name: "ZERI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/221.png",
  },
  {
    id: 222,
    name: "JINX",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/222.png",
  },
  {
    id: 223,
    name: "TAHM_KENCH",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/223.png",
  },
  {
    id: 234,
    name: "VIEGO",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/234.png",
  },
  {
    id: 235,
    name: "SENNA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/235.png",
  },
  {
    id: 236,
    name: "LUCIAN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/236.png",
  },
  {
    id: 238,
    name: "ZED",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/238.png",
  },
  {
    id: 240,
    name: "KLED",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/240.png",
  },
  {
    id: 245,
    name: "EKKO",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/245.png",
  },
  {
    id: 246,
    name: "QIYANA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/246.png",
  },
  {
    id: 254,
    name: "VI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/254.png",
  },
  {
    id: 266,
    name: "AATROX",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/266.png",
  },
  {
    id: 267,
    name: "NAMI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/267.png",
  },
  {
    id: 268,
    name: "AZIR",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/268.png",
  },
  {
    id: 350,
    name: "YUUMI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/350.png",
  },
  {
    id: 360,
    name: "SAMIRA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/360.png",
  },
  {
    id: 412,
    name: "THRESH",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/412.png",
  },
  {
    id: 420,
    name: "ILLAOI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/420.png",
  },
  {
    id: 421,
    name: "REK_SAI",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/421.png",
  },
  {
    id: 427,
    name: "IVERN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/427.png",
  },
  {
    id: 429,
    name: "KALISTA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/429.png",
  },
  {
    id: 432,
    name: "BARD",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/432.png",
  },
  {
    id: 497,
    name: "RAKAN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/497.png",
  },
  {
    id: 498,
    name: "XAYAH",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/498.png",
  },
  {
    id: 516,
    name: "ORNN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/516.png",
  },
  {
    id: 517,
    name: "SYLAS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/517.png",
  },
  {
    id: 518,
    name: "NEEKO",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/518.png",
  },
  {
    id: 523,
    name: "APHELIOS",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/523.png",
  },
  {
    id: 526,
    name: "RELL",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/526.png",
  },
  {
    id: 555,
    name: "PYKE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/555.png",
  },
  {
    id: 711,
    name: "VEX",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/711.png",
  },
  {
    id: 777,
    name: "YONE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/777.png",
  },
  {
    id: 875,
    name: "SETT",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/875.png",
  },
  {
    id: 876,
    name: "LILLIA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/876.png",
  },
  {
    id: 887,
    name: "GWEN",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/887.png",
  },
  {
    id: 888,
    name: "RENATA",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/888.png",
  },
  {
    id: 895,
    name: "NILAH",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/895.png",
  },
  {
    id: 897,
    name: "KSANTE",
    icon: "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/897.png",
  },
];

class HelpCommand extends DiscordCommand {
  data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("List all available commands");

  async execute(interaction: CommandInteraction) {
    const guild = interaction.guild!;

    const servers = [
      "981788445926109235",
      "1062403128676339802",
      "1062403223220146197",
      "1062416065306574868",
    ];

    // for (let i = 150; i < champions.length; i++) {
    //   await guild.emojis.create({
    //     attachment: champions[i].icon,
    //     name: champions[i].name,
    //   });
    // }

    const emojis = await guild.emojis.fetch();
    let i = 150;
    emojis.forEach((emoji) => {
      console.log(
        `${champions[i].id}: {name: "${
          champions[i].name
        }", discordIcon: "${getEmojiEncoding(emoji)}"}`
      );
      i++;
    });

    const commands = {
      "/roll <multiplier>": "Roll a champion",
      "/daily": "Get 30 gold. This command can be run every 6 hours.",
      "/shop": "View shop information",
      "/shop <x>": "Buy a random x-cost champion",
      "/info": "View account information",
      "/inventory": "List all champions in inventory",
      "/equip <champion>": "Set a champion in inventory to be the main fighter",
      "/fight <@user>":
        "Fight another user. Make sure both users have equipped their fighter",
      "/rank": "Rank users by points",
      "/rankbal": "Rank users by balance",
    };

    let description = "";
    for (let [cmdName, cmdDesc] of Object.entries(commands)) {
      description += `\`${cmdName}\` : ${cmdDesc} \n`;
    }

    const embed = new EmbedBuilder()
      .setTitle("Available commands")
      .setDescription(description);

    await interaction.reply({ embeds: [embed] });
  }
}

export default HelpCommand;
