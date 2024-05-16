import { Message } from "discord.js";
import { i18n } from "../utils/i18n";

export default {
  name: "kill",
  cooldown: 60,
  description: i18n.__("kill.description"),
  execute(message: Message) {
    message.reply(i18n.__("kill.result"))
    process.exit(1);
  }
};
