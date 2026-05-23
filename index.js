const { 
    Client,
    GatewayIntentBits,
    Collection,
    Partials
} = require("discord.js");

const { joinVoiceChannel } = require("@discordjs/voice");

console.clear();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [
        Partials.Message,
        Partials.Channel
    ]
});

module.exports = client;

client.slashCommands = new Collection();

const { token } = require("./token.json");

client.login(token);

const evento = require("./handler/Events");
evento.run(client);

require("./handler/index")(client);

client.once("ready", async () => {

    console.log(`🚀 Estou online em ${client.user.username}!`);
    console.log(`👥 Tenho ${client.users.cache.size} Amiguinhos :D`);
    console.log(`🌐 Estou em ${client.guilds.cache.size} Servidores XD`);

    // ===== SISTEMA 24/7 EM CALL =====

    const canalId = "1507639879180222498";

    try {

        const canal = await client.channels.fetch(canalId);

        if (!canal) {
            return console.log("❌ Canal de voz não encontrado.");
        }

        joinVoiceChannel({
            channelId: canal.id,
            guildId: canal.guild.id,
            adapterCreator: canal.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: true
        });

        console.log("🔊 Bot conectado na call 24/7!");

    } catch (err) {
        console.log("❌ Erro ao conectar na call:");
        console.log(err);
    }

});

process.on('unhandledRejection', (reason, promise) => {
    console.log(`🚫 Erro Detectado:\n\n`, reason);
});

process.on('uncaughtException', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n`, error);
});