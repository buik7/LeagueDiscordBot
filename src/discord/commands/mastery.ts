import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { DbRiotInfo } from "../../database/dtos/riotinfo/type";
import { ChampionApi } from "../../riot/api/lol/champion";
import { LolApi } from "../../riot/api/lol/lol";
import { SummonerApi } from "../../riot/api/lol/summoner";
import { getChampionById, Regions } from "../../riot/constants";
import { ChampionMasteryDTO } from "../../riot/dtos";
import { buildCommand, LeagueOptionName } from "../models/leagueCommandBuilder";
import DiscordCommand from "../types/Command";
import { validateUser } from "../utils/validateUser";

class MasteryCommand extends DiscordCommand {
  data = buildCommand({
    name: "mastery",
    description: "List 10 champions with the highest mastery of a summoner",
    options: {
      summonerName: {
        description: "Summoner name (region also must be specified)",
        required: false,
      },
      region: {
        description: "The region of the summoner",
        required: false,
      },
      discordUser: {
        description: "Tag the user that you want to view champion masteries",
        required: false,
      },
    },
  });

  async execute(interaction: ChatInputCommandInteraction) {
    interaction.deferReply();
    const summonerName = interaction.options.getString(
      LeagueOptionName.summonerName
    );
    const region = interaction.options.getString(
      LeagueOptionName.region
    ) as Regions | null;
    let discordUser = interaction.options.getUser(LeagueOptionName.discordUser);

    const lolApi = new LolApi();

    // The summoner that we will fetch champion mastery for
    let summoner: DbRiotInfo = {} as DbRiotInfo;

    if (summonerName && region) {
      try {
        const apiSummoner = await lolApi.Summoner.getByName(
          region,
          summonerName
        );
        summoner.summonerName = summonerName;
        summoner.puuid = apiSummoner.puuid;
        summoner.encryptedSummonerId = apiSummoner.id;
        summoner.region = region;
        summoner.profileIconId = apiSummoner.profileIconId;
      } catch (error) {
        console.error(error);
        await interaction.reply(
          `Summoner ${summonerName} of region ${region} does not exist.`
        );
        return;
      }
    } else {
      // If another user is specified, then we fetch data for that user.
      // Else, we fetch data for current user (the interaction's author)
      if (!discordUser) discordUser = interaction.user;
      const validationResult = await validateUser(
        discordUser.id,
        interaction.guildId!,
        { riotInfo: true }
      );
      if (!validationResult.success || !validationResult.userRiotInfo) {
        await interaction.reply(
          `${discordUser.toString()} has not linked their League Accout yet. Use \`/link\` to link your account!`
        );
        return;
      }
      summoner = validationResult.userRiotInfo.toObject();
    }

    const championMasteries =
      await lolApi.Champion.getTopChampionMasteryBySummoner(
        summoner.region,
        summoner.encryptedSummonerId,
        10
      );

    if (championMasteries.length === 0) {
      await interaction.reply(
        `${summoner.summonerName} hasn't played any games in League of Legends`
      );
      return;
    }

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${summoner.summonerName} [${summoner.region}]`,
        iconURL: SummonerApi.getProfileIconURL(summoner.profileIconId),
      })
      .setColor(0xe91e63)
      .setDescription(this.displayChampionMastery(championMasteries));

    await interaction.reply({ embeds: [embed] });
  }

  private displayChampionMastery(championMasteries: ChampionMasteryDTO[]) {
    let description = `${championMasteries.length} champions with the highest masteries:\n`;
    championMasteries.forEach(
      ({ championLevel, championPoints, championId }) => {
        const champion = getChampionById(championId, true);
        description += ChampionApi.getMasteryDiscordIcon(championLevel);
        description += champion.discordIcon;
        description += `**${champion.name}** - ${championPoints} \n`;
      }
    );

    return description;
  }
}

export default MasteryCommand;
