import { Message } from "discord.js";
import { config } from "../utils/config";
import { i18n } from "../utils/i18n";

export default {
  name: "config",
  description: i18n.__("config.description"),
  permissions: ["OVERLORD"],
  execute(message: Message) {
    return message
      .member!.send(
          JSON.stringify(config)
    //     `https://discord.com/oauth2/authorize?client_id=${
    //       message.client.user!.id
    //     }&permissions=70282305&scope=bot
    // `
      )
      .catch(console.error);
  }
};
