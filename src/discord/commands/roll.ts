import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { findGameById } from "../../database/dtos/game/controller";
import { findOneOrCreateDbUser } from "../../database/dtos/user/controller";
import ChampionTftApi from "../../riot/api/tft/champion";
import DiscordCommand from "../types/Command";

class RollCommand extends DiscordCommand {
  data = new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Roll a champion in TFT Set 8")
    .addIntegerOption((option) =>
      option
        .setName("multiplier")
        .setDescription(
          "The higher the multiplier, the more gold you can get but also the more gold you can lose."
        )
        .setMinValue(1)
    );

  async execute(interaction: ChatInputCommandInteraction) {
    const _id = {
      discordUserId: interaction.user.id,
      discordGuildId: interaction.guild!.id,
    };

    const result = await findOneOrCreateDbUser(_id, interaction.user.tag);
    if (!result || !result.user) {
      await this.displayError(interaction);
      return;
    }

    const { user, created } = result;
    const content = created
      ? "Your new account was created with an initial balance of 30!"
      : "";

    const userGame = await findGameById(user.gameId);
    if (!userGame) {
      await this.displayError(interaction);
      return;
    }

    const multiplier = interaction.options.getInteger("multiplier") ?? 1;
    if (userGame.balance < 3 * multiplier) {
      await interaction.reply({
        content: this.getNotEnoughBalanceError(
          interaction.user.id,
          multiplier,
          userGame.balance
        ),
        ephemeral: true,
      });
      return;
    }

    const { gain, fee, net, champion } = this.rollChampion(multiplier);
    const { netText, netDescription } = this.getNetOutput(net);

    userGame.balance += net;
    await userGame.save();

    const embed = new EmbedBuilder()
      .setColor(ChampionTftApi.mapChampionCostToColor(champion.cost))
      .setTitle(`You rolled a ${champion.name} (${champion.cost} :coin:)!`)
      .setAuthor({ name: interaction.user.tag })
      .setDescription(netDescription)
      .addFields(
        { name: "Gain:", value: gain.toString(), inline: true },
        { name: "Fee:", value: fee.toString(), inline: true },
        { name: "Net:", value: netText, inline: true },
        { name: "Multiplier: ", value: multiplier.toString(), inline: true },
        {
          name: "New balance: ",
          value: userGame.balance.toLocaleString(),
          inline: true,
        }
      )
      .setImage(champion.icon);
    await interaction.reply({ embeds: [embed], content });
  }

  private rollChampion(multiplier: number) {
    const champion = ChampionTftApi.getRandomChampion();
    const gain = champion.cost * multiplier;
    const fee = 3 * multiplier;
    const net = gain - fee;
    return { gain, fee, net, champion };
  }

  private getNetOutput(net: number) {
    let netText = net.toString();
    let netDescription = "Your balance was unchanged.";
    if (net > 0) {
      netText = `+${net}`;
      netDescription = `You gained ${net} gold!`;
    } else if (net < 0) {
      netDescription = `You lost ${net * -1} gold.`;
    }

    return { netText, netDescription };
  }

  private getNotEnoughBalanceError(
    discordUserId: string,
    multiplier: number,
    balance: number
  ) {
    return `<@${discordUserId}>, You need at least ${
      3 * multiplier
    } gold to roll with a multiplier of ${multiplier}. (Current balance: ${balance})`;
  }

  private async displayError(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content:
        "There was an error occured while execute this command. Please try again later",
      ephemeral: true,
    });
  }
}

export default RollCommand;
