const Discord = require("discord.js");
const client = new Discord.Client({ partials: Object.values(Object.fromEntries(new Map(Object.entries(Discord.Partials).filter((e) => Number.isInteger(e[1]))))),  intents: Object.values(Object.fromEntries(new Map(Object.entries(Discord.GatewayIntentBits).filter((e) => Number.isInteger(e[1]))))) });
client.commands = [];

require("dotenv").config();
const fs = require("fs");

fs.readdirSync("./commands").forEach((file) => {
  if (!file.endsWith(".js")) return;
  client.commands.push(require(`./commands/${file}`));
});

fs.readdirSync("./events").forEach((file) => {
  if (!file.endsWith(".js")) return;
  let event = require(`./events/${file}`);
  if (event.once) return client.once(file.split(".")[0], (...args) => event.execute(client, ...args));
  client.on(file.split(".")[0], (...args) => event.execute(client, ...args));
})

client.login(process.env.TOKEN);