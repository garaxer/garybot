const Discord = require("discord.js");
const auth = require("./auth.json");
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
  if (!mO.author.bot) {
    const ch = mO.channel;
    const author = mO.author;
    const embed = {
      embed: {
        author: {
          name: author.username + " just made an edit!",
          icon_url: author.avatarURL
        },
        fields: [{
            name: "Old Message",
            value: mO.content
          },
          {
            name: "New Message",
            value: mN.content
          }
        ]
      }
    }

    ch.send(embed)
      .catch(console.error);
    console.log(author.username + " edited a message. (" + mO.content + ") is now (" + mN.content + ")")
  }
})

bot.login(auth.token);
