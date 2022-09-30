import { Message } from "discord.js";
import { bot } from "../index";
import { i18n } from "../utils/i18n";

const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;

export default {
  name: "clear",
  aliases: ["cl"],
  description: i18n.__("clear.description"),
  execute(message: Message) {
    const queue = bot.queues.get(message.guild!.id);

    if (!queue) return message.reply(i18n.__("clear.errorNotQueue")).catch(console.error);

    queue.songs = [];

    queue.textChannel.send(
      i18n.__mf("clear.result", {
        author: message.author.id
      })
    );
  }
};
