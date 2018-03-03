const Discord = require("discord.js");
const auth = require("./auth.json");
const lib = require("./src/lib.js");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("All systems nominal.");
});

bot.on("message", message => {
  if (lib.isCommand(message)) {

    const ch = message.channel;
    const usr = message.author.username;
    const cmd = lib.getCommand(message)

    lib.featSearch(cmd)
      .then(feat => {
        const params = lib.getParams(feat.cmd, cmd);
        lib.log(usr, feat.log(params));
        return feat.func(params, message.author.id);
      })
      .then(msg => ch.send(msg))
      .catch(error => {
        console.error(usr + " entered an invalid command - " + cmd);
        ch.send("What the fuck is a " + "\"" + cmd + "\"" + " lmao.");
      })
  }

});

bot.login(auth.token);
