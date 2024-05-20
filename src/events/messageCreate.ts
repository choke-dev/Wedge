import { Bot } from "../../bot.ts";
import { addReaction, deleteMessage, getChannel, hasGuildPermissions } from "../../deps.ts";

const config = {
  "1241695709212704778": [ // media
    "👍",
    "😂",
    "😳",
    "🤔",
    "😲",
    "😢",
    "😡",
    "🧵",
  ],
  "1241669747108483072": [ // creations
    "👍",
    "😂",
    "😳",
    "🤔",
    "😲",
    "😢",
    "😡",
    "🧵",
  ],
  "1241444035512500295": [ // art
    "❤️",
    "🤩",
    "🤯",
    "😳",
    "🤨",
    "😐",
    "😢",
    "🧵",
  ],
  "1241444691015110778": [ // memes
    "👍",
    "😂",
    "😳",
    "🤔",
    "😲",
    "😢",
    "😡",
    "🧵",
  ],
  "1241706024969306182": [ // gamenight-media
    "👍",
    "😂",
    "😳",
    "🤔",
    "😲",
    "😢",
    "😡",
    "🧵",
  ],
};

Bot.events.messageCreate = async (bot, message) => {
  if (!message?.guildId) return;

  const channelId = String(message.channelId);
  const channelConfig = (config as Record<string, string[]>)[channelId];
  if (!channelConfig) return;

  const isMemberImmune = hasGuildPermissions(Bot, message.guildId, message.authorId, ["MANAGE_MESSAGES"]);

  if (message.attachments.length === 0 && message.embeds.length === 0) {
    const channel = await getChannel(bot, BigInt(channelId));
    const channelName = channel?.name;
    if (isMemberImmune) return;

    return deleteMessage(bot, message.channelId, message.id, `no media content submitted in #${channelName}`);
  }

  for (let i = 0; i < channelConfig.length; i++) {
    await addReaction(bot, message.channelId, message.id, channelConfig[i]);
  }
};
