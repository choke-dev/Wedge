import { dotEnvConfig } from "./deps.ts";

// Get the .env file that the user should have created, and get the token
const env = dotEnvConfig({ export: true });
const token = env.BOT_TOKEN || "";
const developers: string[] = ["208876506146013185"];

export interface Config {
  token: string;
  botId: bigint;
  developers: string[];
}

export const configs = {
  /** Get token from ENV variable */
  token,
  /** Get the BotId from the token */
  botId: BigInt(atob(token.split(".")[0])),
  /** The server id where you develop your bot and want dev commands created. */
  devGuildId: BigInt(env.DEV_GUILD_ID!),
  developers: developers.map(BigInt) || [],
};
