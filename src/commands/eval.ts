import { configs } from "../../configs.ts";
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
  sendPrivateInteractionResponse,
} from "../../deps.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "eval",
  description: "Evaluate javascript code",
  options: [
    {
      name: "code",
      description: "The code to execute",
      type: ApplicationCommandOptionTypes.String,
      required: true,
    },
  ],
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,

  execute: async (Bot, interaction) => {
    if (!configs.developers.includes(interaction.user.id)) {
      return sendPrivateInteractionResponse(Bot, interaction.id, interaction.token, {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: "You are not allowed to use this command!",
        },
      });
    }

    const code = String(interaction.data?.options?.[0].value);

    let evalResult;

    try {
      evalResult = eval(code);
    } catch (error) {
      return sendPrivateInteractionResponse(Bot, interaction.id, interaction.token, {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `An error occured while trying to evaluate the requested code.\n\`\`\`js\n${error}\`\`\``,
        },
      });
    }

    return sendPrivateInteractionResponse(Bot, interaction.id, interaction.token, {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: `\`\`\`js\n${evalResult}\`\`\``,
      },
    });
  },
});
