import { ActionRowBuilder } from "@discordjs/builders";
import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { findGameById } from "../../database/dtos/game/controller";
import { DbGameDocument } from "../../database/dtos/game/type";
import { DbInventoryDocument } from "../../database/dtos/inventory";
import { findInventoryById } from "../../database/dtos/inventory/controller";
import { DbUserDocument } from "../../database/dtos/user";
import { findDbUserById } from "../../database/dtos/user/controller";
import ChampionTftApi from "../../riot/api/tft/champion";
import DiscordCommand from "../types/Command";

class FightCommand extends DiscordCommand {
  data = new SlashCommandBuilder()
    .setName("fight")
    .setDescription("Fight a chosen user")
    .addUserOption((option) =>
      option
        .setName("enemy")
        .setDescription("Tag the user that you want to fight")
        .setRequired(true)
    );

  async execute(interaction: ChatInputCommandInteraction) {
    const discordEnemy = interaction.options.getUser("enemy");
    if (!discordEnemy) {
      await interaction.reply("Please specify an enemy");
      return;
    }
    if (discordEnemy.id === interaction.user.id) {
      await interaction.reply("You cannot fight yourself!");
      return;
    }
    if (discordEnemy.bot) {
      await interaction.reply("Bots can't fight, unfornately.");
      return;
    }

    const userValidationResult = await this.validateUserInventory(
      interaction.user.id,
      interaction.guildId!
    );
    if (!userValidationResult.success) {
      await interaction.reply(userValidationResult.errorMessage);
      return;
    }

    const { user, userInventory } = userValidationResult;

    const enemyValidationResult = await this.validateUserInventory(
      discordEnemy.id,
      interaction.guildId!
    );

    if (!enemyValidationResult.success) {
      await interaction.reply(enemyValidationResult.errorMessage);
      return;
    }

    const enemy = enemyValidationResult.user;
    const enemyInventory = enemyValidationResult.userInventory;

    enum FightAcceptanceActions {
      accept = "Accept",
      decline = "Decline",
    }

    const fightAcceptanceRows =
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId(FightAcceptanceActions.accept)
          .setStyle(ButtonStyle.Primary)
          .setLabel(FightAcceptanceActions.accept),
        new ButtonBuilder()
          .setCustomId(FightAcceptanceActions.decline)
          .setStyle(ButtonStyle.Danger)
          .setLabel(FightAcceptanceActions.decline)
      );

    const acceptanceReply = await interaction.reply({
      content: `${discordEnemy.toString()}, do you want to fight ${interaction.user.toString()}?`,
      components: [fightAcceptanceRows],
      fetchReply: true,
    });

    const acceptanceCollector = acceptanceReply.createMessageComponentCollector(
      {
        filter: (i) =>
          i.user.id === discordEnemy.id &&
          i.message.id === acceptanceReply.id &&
          (i.customId === FightAcceptanceActions.accept ||
            i.customId === FightAcceptanceActions.decline),
        time: 100000,
      }
    );

    let isFightAccepted = false;

    acceptanceCollector.on(
      "collect",
      async (buttonInteraction: ButtonInteraction) => {
        if (!buttonInteraction.deferred) {
          await buttonInteraction.deferUpdate();
        }
        if (buttonInteraction.customId === FightAcceptanceActions.accept)
          isFightAccepted = true;

        acceptanceCollector.stop();
      }
    );

    acceptanceCollector.on("end", async () => {
      if (!isFightAccepted) {
        await interaction.editReply({
          content: `${discordEnemy.username} declined the fight`,
          components: [],
        });
        return;
      }

      await interaction.editReply({
        content: `${discordEnemy.toString()} accepted the fight`,
        components: [],
      });

      const fightGame = new FightGame(
        { user: user, inventory: userInventory },
        { user: enemy, inventory: enemyInventory }
      );

      const fightActionRows =
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId(FightAction.Attack)
            .setStyle(ButtonStyle.Primary)
            .setLabel(FightAction.Attack),
          new ButtonBuilder()
            .setCustomId(FightAction.Spell)
            .setStyle(ButtonStyle.Success)
            .setLabel(FightAction.Spell)
        );

      const fightActionCollector =
        interaction.channel!.createMessageComponentCollector({
          filter: (i) =>
            (i.customId === FightAction.Attack ||
              i.customId === FightAction.Spell) &&
            (i.user.id === interaction.user.id ||
              i.user.id === discordEnemy.id),
          time: 120000,
        });

      interaction.channel!.send({
        content: fightGame.getQuestion(),
        components: [fightActionRows],
      });

      fightActionCollector.on(
        "collect",
        async (buttonInteraction: ButtonInteraction) => {
          if (!buttonInteraction.deferred) {
            await buttonInteraction.deferUpdate();
          }
          if (
            buttonInteraction.user.id !==
            fightGame.currentPlayer.user._id.discordUserId
          )
            return;

          let message = fightGame.executeAction(
            buttonInteraction.customId as FightAction
          ).message;
          message = message + "\n" + fightGame.getHpDescription();

          await buttonInteraction.editReply({
            content: buttonInteraction.message.content + "\n",
            components: [],
          });

          if (fightGame.isOver()) {
            interaction.channel!.send(
              message + "\n" + fightGame.getWinnerMessage()
            );
            fightActionCollector.stop();
          } else {
            fightGame.switchTurn();
            await interaction.channel!.send({
              content: message + "\n" + fightGame.getQuestion(),
              components: [fightActionRows],
            });
          }
        }
      );
    });
  }

  private async validateUserInventory(
    discordUserId: string,
    discordGuildId: string
  ): Promise<
    | { success: false; errorMessage: string }
    | {
        success: true;
        user: DbUserDocument;
        userGame: DbGameDocument;
        userInventory: DbInventoryDocument;
      }
  > {
    const noAccountError = `<@${discordUserId}> doesn't have an account. Use \`daily\` to create one!`;
    const serverError =
      "There was an error occured while execute this command. Please try again later";
    const emptyInventoryError = `<@${discordUserId}> haven't set their fighter. Use \`/equip <champion_name>\` to set the main fighter.`;

    const user = await findDbUserById({ discordUserId, discordGuildId });
    if (!user) {
      return { success: false, errorMessage: noAccountError };
    }

    const userGame = await findGameById(user.gameId);
    if (!userGame) {
      return { success: false, errorMessage: serverError };
    }
    if (!userGame.inventoryId) {
      return { success: false, errorMessage: emptyInventoryError };
    }

    const userInventory = await findInventoryById(userGame.inventoryId);
    if (!userInventory) {
      return { success: false, errorMessage: serverError };
    }
    if (!userInventory.mainChampion.name) {
      return { success: false, errorMessage: emptyInventoryError };
    }

    return {
      success: true,
      user,
      userGame,
      userInventory,
    };
  }
}

interface CompleteUser {
  user: DbUserDocument;
  inventory: DbInventoryDocument;
}

interface FightUser {
  user: DbUserDocument;
  championName: string;
  championAbility: string;
  damage: number;
  hp: number;
  physicalDamageReduction: number;
  magicDamageReduction: number;
}

enum FightAction {
  Attack = "Attack",
  Spell = "Spell",
}

interface FightActionResult {
  miss: boolean;
  crit: boolean;
  damageDealt: number;
  message: string;
}

class FightGame {
  private turn: boolean; /* Only used for display purposes */
  currentPlayer: FightUser;
  enemyPlayer: FightUser;

  constructor(user1: CompleteUser, user2: CompleteUser) {
    this.turn = true;
    this.currentPlayer = this.constructFightUser(user1);
    this.enemyPlayer = this.constructFightUser(user2);
  }

  private constructFightUser(user: CompleteUser): FightUser {
    const mainChampion = user.inventory.mainChampion;
    const star = mainChampion.star;
    const { hp, armor, magicResist, damage } = mainChampion.stats;
    return {
      user: user.user,
      championName: mainChampion.name,
      championAbility: mainChampion.ability.name,
      damage: damage * star,
      hp: hp * star,
      physicalDamageReduction: ChampionTftApi.getPhysicalDamageReduction(
        armor * star
      ),
      magicDamageReduction: ChampionTftApi.getMagicDamageReduction(
        magicResist * star
      ),
    };
  }

  public executeAction(action: FightAction) {
    if (action === FightAction.Attack) return this.attack();
    return this.spell();
  }

  private spell(): FightActionResult {
    const miss = Math.random() < 0.4 ? true : false;
    if (miss)
      return {
        miss: true,
        crit: false,
        damageDealt: 0,
        message: `${this.currentPlayer.championName}'s spell missed!`,
      };

    const crit = Math.random() < 0.25;
    const critMultiplier = crit ? 10 : 7;
    const damageDealt = Math.floor(
      this.currentPlayer.damage *
        critMultiplier *
        this.enemyPlayer.magicDamageReduction *
        0.01
    );
    this.enemyPlayer.hp -= damageDealt;

    let message = `${this.currentPlayer.championName} used ${this.currentPlayer.championAbility} and dealed **${damageDealt}** magic damage.`;
    if (crit) {
      message = `:zap: ${this.currentPlayer.championName}'s ${this.currentPlayer.championAbility} has critted and dealt **${damageDealt}** magic damage.`;
    }

    return {
      miss: false,
      crit,
      damageDealt,
      message,
    };
  }

  private attack(): FightActionResult {
    const crit = Math.random() < 0.25;
    const critMultiplier = crit ? 8 : 4;
    const damageDealt = Math.floor(
      this.currentPlayer.damage *
        critMultiplier *
        this.enemyPlayer.physicalDamageReduction *
        0.01
    );
    this.enemyPlayer.hp -= damageDealt;
    let message = `${this.currentPlayer.championName}'s attack dealed **${damageDealt}** physical damage.`;
    if (crit) {
      message = `:zap: ${this.currentPlayer.championName}'s attack dealed **${damageDealt}** physical damage.`;
    }
    return {
      miss: false,
      crit,
      damageDealt,
      message,
    };
  }

  public switchTurn() {
    const tempPlayer = this.currentPlayer;
    this.currentPlayer = this.enemyPlayer;
    this.enemyPlayer = tempPlayer;
    this.turn = !this.turn;
  }

  public getQuestion() {
    return `<@${this.currentPlayer.user._id.discordUserId}>, What does ${this.currentPlayer.championName} do?`;
  }

  public getWinnerMessage() {
    return `<@${this.currentPlayer.user._id.discordUserId}> wins`;
  }

  public getHpDescription() {
    const p1 = this.turn ? this.currentPlayer : this.enemyPlayer;
    const p2 = this.turn ? this.enemyPlayer : this.currentPlayer;
    return `${p1.user.tag}: **${p1.hp}** HP\n${p2.user.tag}: **${p2.hp}** HP`;
  }

  public isOver() {
    return this.currentPlayer.hp <= 0 || this.enemyPlayer.hp <= 0;
  }
}

export default FightCommand;
