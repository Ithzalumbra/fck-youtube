import { Message, MessageEmbed } from "discord.js";
import { i18n } from "../utils/i18n";
// @ts-ignore
import lyricsFinder from "lyrics-finder";
import { bot, GeniusAPI } from "../index";

export default {
  name: "lyrics",
  aliases: ["ly", 'l'],
  description: i18n.__("lyrics.description"),
  async execute(message: Message) {
    const queue = bot.queues.get(message.guild!.id);

    if (!queue || !queue.songs.length) return message.reply(i18n.__("lyrics.errorNotQueue")).catch(console.error);

    let lyrics = null;
    let geniusUrl = "";
    let thumbnailUrl = "";
    const title = queue.songs[0].title;

    try {
      const searches = GeniusAPI.songs.search(title);
      const firstResult = await (await searches)[0];

      lyrics = await firstResult.lyrics();
      geniusUrl = firstResult.url;
      thumbnailUrl = firstResult.thumbnail;
    } catch (error) {
      lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: title });
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle("Genius | " + i18n.__mf("lyrics.embedTitle", { title: title }))
      .setDescription(lyrics)
      .setColor("#F8AA2A")
      .setTimestamp()
      .setURL(geniusUrl)
      .setThumbnail(thumbnailUrl);

    if (lyricsEmbed.description!.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description!.substr(0, 2045)}...`;

    return message.reply({ embeds: [lyricsEmbed] }).catch(console.error);
  }
};
