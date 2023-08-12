const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
  slash: new SlashCommandBuilder()
      .setName('unlink')
      .setDescription("Unlink a connection")
      .addStringOption(option => option.setName("connection").setDescription("The connection to unlink").setRequired(true).addChoices({ name: "Hyakanime", value: "hyakanime" }, { name: "Deezer", value: "deezer" }, { name: "Monkeytype", value: "monkeytype" }, { name: "Mangacollec", value: "mangacollec" })),

  execute: (client, interaction) => {
    let connection = interaction.options.getString("connection");

    axios.get(`${process.env.BC_DOMAIN}/getUserKey?id=${interaction.user.id}&key=${process.env.BC_APIKEY}`).then(res => {
      let token = res.data.message;
      axios.delete(`${process.env.BC_DOMAIN}/connections/${connection}`, { headers: { "Content-Type": "application/json" }, data: { token } }).then(res => {
        interaction.reply({ content: `:white_check_mark: | The connection ${connection} unlinked.` });
      })
    })
  }
}