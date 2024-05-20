import { Bot } from "../../bot.ts";
import { addReaction, deleteMessage, hasGuildPermissions } from "../../deps.ts";
import log from "../utils/logger.ts";

const emojiSets = [
  ["👍", "😂", "😳", "🤔", "😲", "😢", "😡", "🧵"],
  ["❤️", "🤩", "🤯", "😳", "🤨", "😐", "😢", "🧵"],
];

const config = {
  "1241695709212704778": emojiSets[0], // media
  "1241669747108483072": emojiSets[0], // creations
  "1241444035512500295": emojiSets[1], // art
  "1241444691015110778": emojiSets[0], // memes
  "1241706024969306182": emojiSets[0], // gamenight-media
};

Bot.events.messageCreate = async (bot, message) => {
  if (!message?.guildId) return;

  const channelId = String(message.channelId);
  const channelConfig = (config as Record<string, string[]>)[channelId];
  if (!channelConfig) return;

  const isMemberImmune = hasGuildPermissions(Bot, message.guildId, message.authorId, ["MANAGE_MESSAGES"]);

  if (message.attachments.length === 0 && message.embeds.length === 0) {
    if (isMemberImmune) return;

    return deleteMessage(
      bot,
      message.channelId,
      message.id,
      `no attachments nor embeds were submitted`,
    );
  }

  for (let i = 0; i < channelConfig.length; i++) {
    try {
      await addReaction(bot, message.channelId, message.id, channelConfig[i]);
    } catch (err) {
      log.warn(`An error occured while adding reactions: ${err}`);
      break;
    }
  }
};
