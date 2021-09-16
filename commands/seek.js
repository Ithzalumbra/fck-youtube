const { canModifyQueue } = require("../util/Util");
const ytdl = require("ytdl-core");
const i18n = require("../util/i18n");

module.exports = {
    name: "seek",
    aliases: ["sk"],
    description: i18n.__("seek.description"),
    execute(message, args) {
        const { channel } = message.member.voice;
        let seek = Number(args[0]);
    
        const queue = message.client.queue.get(message.guild.id);
        
        if (!channel) return message.reply(i18n.__("seek.errorNotChannel")).catch(console.error);
        if (!queue) return message.reply(i18n.__("seek.errorNotQueue")).catch(console.error);
        if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");
        
        const song = queue.songs[0];
        const stream = ytdl(song.url, {filter: 'audioonly'})
        if(!Number.isInteger(seek))
            return message.reply(i18n.__("seek.errorNotInteger")).catch(console.error);
        if(seek > song.duration)
            return message.reply(i18n.__("seek.errorLongerThanSong")).catch(console.error);
        queue.connection.play(stream, {seek})
        const minuts = Math.floor(seek / 60);
        const seconds = minuts > 0 ? seek - ( minuts * 60 ) : seek;
        const pad = '00'
        message.reply(`Cancion movida a posicion ${minuts}:${pad.substring(0, pad.length - seconds.toString().length) + seconds.toString()}`).catch(console.error);
    }
};