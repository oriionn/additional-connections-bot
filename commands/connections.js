const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
  slash: new SlashCommandBuilder()
      .setName('connections')
      .setDescription("See connections of a user or you")
      .addUserOption(option => option.setName("user").setDescription("The user to see connections")),

  execute: (client, interaction) => {
    let user = interaction.options.getUser("user") || interaction.user;
    axios.get(`${process.env.BC_DOMAIN}/connections?id=${user.id}`).then(res => {
      let deezer = res.data.message.deezer;
      let hyakanime = res.data.message.hyakanime;

      let embed = new EmbedBuilder()
        .setTitle(`${user.username}'s connections`)
        .setColor("#FF0000")
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      if (deezer) {
        embed.addFields( { name: "Deezer", value: `[${deezer.name}](${deezer.link})` });
      }

      if (hyakanime) {
        embed.addFields( { name: "Hyakanime", value: `[${hyakanime.username}](${hyakanime.link})` });
      }

      if (!deezer && !hyakanime) embed.setDescription("This user don't have connections");

      interaction.reply({ embeds: [embed] });
    })
  }
}