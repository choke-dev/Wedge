import { Bot } from "../../bot.ts";
import log from "../utils/logger.ts";

Bot.events.ready = (_, payload) => {
  log.info(`[SHARD READY] Shard ID ${payload.shardId + 1} of ${Bot.gateway.calculateTotalShards()} shard(s) is ready!`);

  if (payload.shardId + 1 === Bot.gateway.calculateTotalShards()) {
    botFullyReady();
  }
};

function botFullyReady() {
  log.info("[READY] All shards have started.");
}
