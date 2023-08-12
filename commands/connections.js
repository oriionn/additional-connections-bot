const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require("axios");
const fs = require("fs");

module.exports = {
  slash: new SlashCommandBuilder()
      .setName('connections')
      .setDescription("See connections of a user or you")
      .addUserOption(option => option.setName("user").setDescription("The user to see connections")),

  execute: (client, interaction) => {
    let user = interaction.options.getUser("user") || interaction.user;
    axios.get(`${process.env.BC_DOMAIN}/connections?id=${user.id}`).then(res => {
      let embed = new EmbedBuilder()
        .setTitle(`${user.username}'s connections`)
        .setColor("#FF0000")
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      let connectionsAvailable = JSON.parse(fs.readFileSync("./connections.json", "utf-8"));
      connectionsAvailable.forEach(connection => {
        if (res.data.message[connection.name.toLowerCase()]) {
          if (process.env.EMOJI_GUILDID) {
            let emoji = client.guilds.cache.get(process.env.EMOJI_GUILDID).emojis.cache.find(emoji => emoji.name === connection.name.toLowerCase());
            if (!emoji) client.guilds.cache.get(process.env.EMOJI_GUILDID).emojis.create( { attachment: connection.emoji_path, name: connection.name.toLowerCase() }).then(emoji => connection.sName = `${emoji} | ${connection.name}`);
            else connection.sName = `${emoji} | ${connection.name}`;
          } else connection.sName = connection.name;
          embed.addFields({ name: connection.sName, value: `[${res.data.message[connection.name.toLowerCase()][connection.params.username]}](${res.data.message[connection.name.toLowerCase()][connection.params.link]})` });
        }
      })
      if (Object.keys(res.data.message).length === 0) embed.setDescription("This user doesn't have connections");

      interaction.reply({ embeds: [embed] });
    })
  }
}