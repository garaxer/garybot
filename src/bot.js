const Discord = require("discord.js");
const auth    = require("../auth.json");

const gary    = new Discord.Client();

gary.on("ready", () => {
  console.log("All systems nominal.");
});

gary.on("message", message => {
  if (message.content == "test") {
    message.channel.send("It's me, Gary!")
  }
});

gary.login(auth.token)
