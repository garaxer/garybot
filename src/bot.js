const Discord = require("discord.js");
const auth    = require("../auth.json");
const lib     = require("./lib.js");

const bot     = new Discord.Client();

bot.on("ready", () => {
  console.log("Reactor online.");
  console.log("Sensors online.");
  console.log("Weapons online.");
  console.log("All systems nominal.");
});

/*bot.on("presenceUpdate", (oldMember, newMember) => {
    oldMember.

   // 182083904545488896
});*/

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    if (oldUserChannel === undefined && newUserChannel !== undefined) {

        console.log("worked"); //never shows

    } else if (newUserChannel === undefined) {

        console.log("worked");

    }
});


bot.on("presenceUpdate", (oldMember, newMember) => {
    if (oldMember.presence.status !== newMember.presence.status) {
        console.log(`${newMember.user.username} is now ${newMember.presence.status}`);
        bot.channels.get('395554251729928192').send(`${newMember.user.username} is now ${newMember.presence.status}`);
    }
});

bot.on("message", message => {
  if (lib.hasSuffix(message) || lib.hasPrefix(message)) {
	
	const ch      = message.channel;
    const user    = message.author.username;
    const command = (lib.hasPrefix(message))
	  ? lib.getCommand(message)
      : lib.getSuffixCommand(message);


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
