import { connectToDatabase } from "./database";
import DiscordClient from "./discord/client";

new DiscordClient();
connectToDatabase();
