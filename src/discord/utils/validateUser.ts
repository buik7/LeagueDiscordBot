import { findGameById } from "../../database/dtos/game/controller";
import { DbGameDocument } from "../../database/dtos/game/type";
import { DbInventoryDocument } from "../../database/dtos/inventory";
import { findInventoryById } from "../../database/dtos/inventory/controller";
import { findRiotInfoById } from "../../database/dtos/riotinfo/controller";
import { DbRiotInfoDocument } from "../../database/dtos/riotinfo/type";
import { DbUserDocument } from "../../database/dtos/user";
import { findDbUserById } from "../../database/dtos/user/controller";

type ValidationLevel = (
  | {
      game?: false;
    }
  | {
      game: true;
      inventory?: false;
    }
  | {
      game: true;
      inventory: true;
      emptyInventory?: boolean;
    }
) & { riotInfo?: boolean };

type ValidationResult =
  | {
      success: false;
      errorMessage: string;
    }
  | {
      success: true;
      user: DbUserDocument;
      userGame: DbGameDocument | undefined;
      userInventory: DbInventoryDocument | undefined;
      userRiotInfo: DbRiotInfoDocument | undefined;
    };

export const validateUser = async (
  discordUserId: string,
  discordGuildId: string,
  validationLevel: ValidationLevel /** pass in an empty object to check user existence only */
): Promise<ValidationResult> => {
  const noAccountError = `<@${discordUserId}> doesn't have an Urbot account. Use \`daily\` to create one!`;
  const noRiotInfoError = `<@${discordUserId}> hasn't linked their League account to their Urbot account yet. Use \`link\` to link both accounts together!`;
  const serverError =
    "There was an error occured while execute this command. Please try again later";
  const emptyInventoryError = `<@${discordUserId}> haven't set their fighter. Use \`/equip <champion_name>\` to set the main fighter.`;

  let user, userGame, userInventory, userRiotInfo;

  user = await findDbUserById({ discordUserId, discordGuildId });
  if (!user) {
    return { success: false, errorMessage: noAccountError };
  }

  if (validationLevel.game) {
    userGame = await findGameById(user.gameId);
    if (!userGame) {
      return { success: false, errorMessage: serverError };
    }

    if (validationLevel.inventory) {
      userInventory = await findInventoryById(userGame.inventoryId);
      if (!userInventory) {
        return { success: false, errorMessage: serverError };
      }

      if (validationLevel.emptyInventory && !userInventory.mainChampion.name) {
        return { success: false, errorMessage: emptyInventoryError };
      }
    }
  }

  if (validationLevel.riotInfo) {
    userRiotInfo = await findRiotInfoById(user.riotInfoId);
    if (!userRiotInfo) {
      return { success: false, errorMessage: noRiotInfoError };
    }
  }

  return {
    success: true,
    user,
    userGame,
    userInventory,
    userRiotInfo,
  };
};
