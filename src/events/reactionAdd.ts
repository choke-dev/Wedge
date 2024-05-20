import { Bot } from "../../bot.ts";
import { deleteReactionsEmoji, getMessage, sendMessage, startThreadWithMessage } from "../../deps.ts";

const threadCreationChannelIds: bigint[] = [
  BigInt("1241695709212704778"), // media
  BigInt("1241669747108483072"), // creations
  BigInt("1241444691015110778"), // memes
  BigInt("1241444035512500295"), // art
  BigInt("1241706024969306182"), // gamenight-media
];

Bot.events.reactionAdd = async (bot, payload) => {
  if (payload.emoji.name !== "🧵") return;
  if (!threadCreationChannelIds.includes(payload.channelId)) return;
  if (payload.userId === bot.id) return;

  deleteReactionsEmoji(bot, payload.channelId, payload.messageId, "🧵");
  //removeReactionEmoji(bot, payload.channelId, payload.messageId, "🧵");

  const message = await getMessage(bot, payload.channelId, payload.messageId);
  let threadName: string = message?.content.split("\n")[0] || "...";

  if (threadName?.length > 100) {
    threadName = threadName.slice(0, 100);
  }

  startThreadWithMessage(bot, payload.channelId, payload.messageId, {
    autoArchiveDuration: 10080,
    name: threadName,
    rateLimitPerUser: null,
  }).then((threadChannel) => {
    sendMessage(bot, threadChannel.id, {
      content: `<@${payload.user?.id}> started a thread for this message.`,
    });
  });
};
