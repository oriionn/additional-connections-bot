const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
  slash: new SlashCommandBuilder()
      .setName('link')
      .setDescription("Get your better connections's token"),

  execute: (client, interaction) => {
    axios.get(`${process.env.BC_DOMAIN}/getUserKey?id=${interaction.user.id}&key=${process.env.BC_APIKEY}`).then(res => {
        let token = res.data.message;
        let embed = new EmbedBuilder()
            .setTitle("Better Connections")
            .setDescription(`Your token is: \`${token}\``)
            .setColor("#FF0000")
        interaction.reply({ embeds: [embed], ephemeral: true })
    })
  }
}