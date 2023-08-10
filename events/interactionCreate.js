const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  once: false,
  execute: (client, interaction) => {
    client.commands.find((command) => command.slash.name === interaction.commandName).execute(client, interaction);
  }
}