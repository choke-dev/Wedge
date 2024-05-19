import { Bot } from "../../bot.ts";
import { addReaction, deleteMessage, getChannel, startThreadWithMessage } from "../../deps.ts";

const config = {
  "1241669747108483072": [ // creations
    "👍",
    "😂",
    "😳",
    "🤔",
    "😲",
    "😢",
    "😡",
  ],
  "1241444035512500295": [ // art
    "❤️",
    "🤩",
    "🤯",
    "😳",
    "🤨",
    "😐",
    "😢",
  ],
  "1241444691015110778": [ // memes
    "👍",
    "😂",
    "😳",
    "🤔",
    "😲",
    "😢",
    "😡",
  ],
};

Bot.events.messageCreate = async (bot, message) => {
  const channelId = String(message.channelId);
  const messageContent = message.content || "...";

  //@ts-ignore stfu
  if (!config[channelId]) return;

  if (message.attachments.length === 0 && message.embeds.length === 0) {
    const channel = await getChannel(bot, BigInt(channelId));
    const channelName = channel?.name;
    return deleteMessage(bot, message.channelId, message.id, `no media content submitted in #${channelName}`);
  }

  startThreadWithMessage(bot, message.channelId, message.id, {
    autoArchiveDuration: 10080,
    name: messageContent,
    rateLimitPerUser: null,
  });

  //@ts-ignore stfu
  for (let i = 0; i < config[channelId].length; i++) {
    //@ts-ignore stfu
    await addReaction(bot, message.channelId, message.id, config[channelId][i]);
  }
};
