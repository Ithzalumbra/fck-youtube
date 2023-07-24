import { Client, Intents } from "discord.js";
import { Bot } from "./structs/Bot";
import { Client as GeniusClient } from "genius-lyrics"; "genius-lyrics";
import { config } from "./utils/config";

export const bot = new Bot(
  new Client({
    restTimeOffset: 0,
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGES
    ]
  })
);

export const GeniusAPI = new GeniusClient("fIo6CFKmUOFgTXQAFwksn5Etz7Q01td12FD_LfkYvoyNS5Cl9fRiMtkLulk6k37Z");