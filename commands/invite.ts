import { Message } from "discord.js";
import { i18n } from "../utils/i18n";

export default {
  name: "invite",
  description: i18n.__("invite.description"),
  execute(message: Message) {
    return message
      .member!.send('https://cdn.discordapp.com/attachments/723372418717974608/1025532662313648191/No-Memes-15.jpg'
    //     `https://discord.com/oauth2/authorize?client_id=${
    //       message.client.user!.id
    //     }&permissions=70282305&scope=bot
    // `
      )
      .catch(console.error);
  }
};
