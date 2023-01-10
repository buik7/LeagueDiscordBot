import axios from "axios";

interface FetchedChampionProps {
  id: number;
  name: string;
  icon: string;
  discordIcon?: string;
}

const fetchChampions = async () => {
  const res = await axios.get(
    "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
  );

  const champions = res.data;
  const championData: FetchedChampionProps[] = [];
  for (let { id, alias } of champions) {
    const championAlias = alias
      .replace(/[a-z][A-Z]/g, (letter: string) => letter[0] + "_" + letter[1])
      .toUpperCase();
    championData.push({
      id: parseInt(id),
      name: championAlias,
      icon: `https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${id}.png`,
    });
  }
  console.log(JSON.stringify(championData));
  return championData;
};
