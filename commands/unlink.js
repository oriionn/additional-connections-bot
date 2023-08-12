const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require("fs");
const axios = require("axios");

let SlashCommand = new SlashCommandBuilder()
    .setName('unlink')
    .setDescription("Unlink a connection")
    .addStringOption(option => option.setName("connection").setDescription("The connection to unlink").setRequired(true));

SlashCommand.options[0].choices = [];
let connectionsAvailable = JSON.parse(fs.readFileSync("./connections.json", "utf-8"));
connectionsAvailable.forEach(connection => {
  SlashCommand.options[0].choices.push({ name: connection.name, value: connection.name.toLowerCase() });
})

module.exports = {
  slash: SlashCommand,

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