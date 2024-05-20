import { config } from "dotenv";
import { Client, IntentsBitField } from "discord.js";
import { clear, append } from "./file.service.js";
import axios from "axios";
config();

const token = process.env.BOT_TOKEN;
const logFilePath = "./log.txt";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is ready`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "dump") {
    clear({ filePath: logFilePath });
    message.reply("Now your shitty diary is clear, mate");
    return;
  }

  const log = `${new Date()} | ${message.content}\n`;

  append({
    filePath: logFilePath,
    content: log,
  });
  axios.defaults.baseURL = "http://localhost:8080";
  axios
    .post("http://localhost:8080/myapp.log", {
      type: "log",
      content: message.content,
    })
    .then((data) => {
      console.log(data);
      message.reply("I've written it, mate, everyone will see it");
    })
    .catch((err) => {
      console.log(err);
      message.reply("There is an error, mate. Fix it");
    });
});

client.login(token);
