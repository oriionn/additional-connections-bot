const Discord = require("discord.js");
const { REST, Routes } = require('discord.js');

const rest = new REST().setToken(process.env.TOKEN);

module.exports = {
  once: true,
  execute: async (client) => {
    console.log(`${client.user.tag} is ready.`);
    client.user.setPresence({ activities: [{ name: `your social connections`, type: Discord.ActivityType.Watching }], status: "online" });

    let cmds = [];
    client.commands.forEach((command) => {
      cmds.push(command.slash);
    })

    let data = await rest.put(Routes.applicationCommands(client.user.id), { body: cmds });
  }
}