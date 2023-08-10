const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  slash: new SlashCommandBuilder()
      .setName('link')
      .setDescription("Get your better connections's token"),

  execute: (client, interaction) => {

  }
}