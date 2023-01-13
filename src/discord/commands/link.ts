import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { createRiotInfo } from "../../database/dtos/riotinfo/controller";
import { LolApi } from "../../riot/api/lol/lol";
import { SummonerApi } from "../../riot/api/lol/summoner";
import { Regions } from "../../riot/constants";
import { buildCommand, LeagueOptionName } from "../models/leagueCommandBuilder";
import DiscordCommand from "../types/Command";
import { validateUser } from "../utils/validateUser";

class LinkCommand extends DiscordCommand {
  data = buildCommand({
    name: "link",
    description: "Link your League of Legends account to your Urbot account",
    options: {
      region: {
        description: "The region that you are playing",
        required: true,
      },
      summonerName: {
        description: "Your summoner name (ingame name)",
        required: true,
      },
    },
  });

  async execute(interaction: ChatInputCommandInteraction) {
    const userValidation = await validateUser(
      interaction.user.id,
      interaction.guildId!,
      {}
    );
    if (!userValidation.success) {
      await interaction.reply(userValidation.errorMessage);
      return;
    }
    const { user } = userValidation;

    const summonerName = interaction.options.getString(
      LeagueOptionName.summonerName
    )!;
    const region = interaction.options.getString(
      LeagueOptionName.region
    ) as Regions;

    const lolApi = new LolApi();
    const summonerInfo = await lolApi.Summoner.getByName(region, summonerName);

    const userRiotInfo = await createRiotInfo({
      profileIconId: summonerInfo.profileIconId,
      summonerName: summonerInfo.name,
      encryptedSummonerId: summonerInfo.id,
      puuid: summonerInfo.puuid,
      region,
    });

    if (!userRiotInfo) {
      await interaction.reply(
        "Account linking failed. Please try again later."
      );
      return;
    }

    user.riotInfoId = userRiotInfo._id;
    await user.save();

    const embed = new EmbedBuilder()
      .setColor(0xeb459e)
      .setAuthor({ name: interaction.user.tag })
      .setTitle(
        `${summonerName} [${region}] is now linked to your Urbot account!`
      )
      .setDescription(`Level: ${summonerInfo.summonerLevel}`)
      .setThumbnail(SummonerApi.getProfileIconURL(summonerInfo.profileIconId));

    await interaction.reply({ embeds: [embed] });
  }
}

export default LinkCommand;
