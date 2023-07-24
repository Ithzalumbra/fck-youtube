import { Message, MessageEmbed } from "discord.js";
import { i18n } from "../utils/i18n";
// @ts-ignore
import lyricsFinder from "lyrics-finder";
import { bot, GeniusAPI } from "../index";

export default {
  name: "lyricssearch",
  aliases: ["ls"],
  description: i18n.__("lyrics.description"),
  async execute(message: Message, args: string[]) {
    const queue = bot.queues.get(message.guild!.id);

    if ((!queue || !queue.songs.length) && args.length == 0) {
      return message.reply(i18n.__("No se encontró una canción en cola ni una canción para buscar manualmente.")).catch(console.error);
    }
    
    let songTitle = args.join(" ");
    
    if (args.length == 0 && queue && queue.songs.length > 0) {
      songTitle = queue.songs[0].title;
    }

    let lyrics = null;
    let geniusUrl = "";
    let thumbnailUrl = "";

    try {
      const searches = GeniusAPI.songs.search(songTitle);
      const firstResult = await (await searches)[0];

      lyrics = await firstResult.lyrics();
      songTitle = firstResult.title;
      geniusUrl = firstResult.url;
      thumbnailUrl = firstResult.thumbnail;
    } catch (error) {
      lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: songTitle });
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle("Genius | " + i18n.__mf("lyrics.embedTitle", { title: songTitle }))
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
