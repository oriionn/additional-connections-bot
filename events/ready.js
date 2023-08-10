const Discord = require("discord.js");

module.exports = {
  once: true,
  execute: (client, ...args) => {
    console.log(`${client.user.tag} is ready.`);
    client.user.setPresence({ activities: [{ name: `your social connections`, type: Discord.ActivityType.Watching }], status: "online" });
  }
}