const Discord = require("discord.js");
const auth = require("./auth.json");
const config = require("./config.json");
const lib = require("./src/lib.js");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("All systems nominal.");
});

bot.on("message", message => {
  const content = message.content;

  if (lib.isCommand(content)) {
    const ch = message.channel;
    const usr = message.author.username;
    const cmd = lib.getCommand(content)

    lib.featSearch(cmd)
      .then(feat => {
        const params = lib.diffRTL(feat.cmd, cmd);
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

bot.on("messageUpdate", (mO, mN) => {
  const ch = bot.channels.find("name", config.botshit);

  if (ch && !mO.author.bot && mN.embeds.length == 0) {
    const author = mO.author;
    const embed = lib.editBuilder(author, mO, mN);

    ch.send(embed)
      .catch(console.error);

    console.log(author.username + " edited a message. (" + mO.content + ") is now (" + mN.content + ")")
  }
})

bot.login(auth.token);
