const Discord = require("discord.js");
const auth = require("../auth.json");
const lib = require("./lib.js");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("Reactor online.");
  console.log("Sensors online.");
  console.log("Weapons online.");
  console.log("All systems nominal.");
});

bot.on("message", message => {
  if (lib.isCommand(message)) {

    const ch = message.channel;
    const user = message.author.username;
    const command = lib.getCommand(message)

    lib.featSearch(command)
      .then(feat => {
        const params = lib.getParams(feat.cmd, command);
        lib.log(user, feat.log(params));
        return feat.func(params, message.author.id);
      })
      .then(msg => ch.send(msg))
      .catch(error => {
        console.error(user + " entered an invalid command - " + command);
        ch.send("What the fuck is a " + "\"" + command + "\"" + " lmao.");
      })
  }

});

bot.login(auth.token);
