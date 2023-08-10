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
            .addFields({ name: "Your token", value: `||${token}||` })
            .setDescription(`⚠ **This token is secret, don't share it with anyone**\nFor use your token, go to [Better Connections Extensions](https://github.com/oriionn/better-connections-extensions)`)
            .setColor("#FF0000")
        interaction.reply({ embeds: [embed], ephemeral: true })
    })
  }
}