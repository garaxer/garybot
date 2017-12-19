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

  if (message.content == "What's the time?") {
    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes();
    const s = today.getSeconds();
    const time = h + ":" + m;
    message.channel.send("It's " + time + " and " + s + " seconds.")
  }

  if (message.content == "Thanks Gary.") {
    message.channel.send("You're welcome, " + message.member + ".")
  }

});

gary.login(auth.token)
