const Discord = require("discord.js");
const auth    = require("../auth.json");
const lib     = require("./lib.js");
const gary    = require("./gary.js").funcs;
const cmds    = require("./gary.js").cmds;

const bot     = new Discord.Client();

bot.on("ready", () => {
  console.log("Reactor online.");
  console.log("Sensors online.");
  console.log("Weapons online.");
  console.log("All systems nominal.");
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
    const command = (lib.hasSuffix(message))
	  ? lib.getSuffixCommand(message)
      : lib.getCommand(message);

    switch (command) {

      case cmds.test:
        lib.log(user, "testing GaryBot.")
        ch.send(gary.test());
      break;

      case cmds.time:
        lib.log(user, "asking for the time.")
        ch.send(gary.time());
      break;

      case cmds.time2:
          lib.log(user, "asking for the time.")
          ch.send(gary.time());
      break;

      case cmds.thanks:
        lib.log(user, "giving thanks to the GaryBot.")
        ch.send(gary.youWelcome());
      break;

      case cmds.celery:
        lib.log(user, "asking for a nude Tayne.")
        ch.send({
          file: "https://i.imgur.com/cqJ3cge.gif"
        });
      break;

      case cmds.man:
        lib.log(user, "asking who the man is.");
        ch.send(gary.whoDaMan(message.author.id))
      break;

      case cmds.joke:
        lib.log(user, "asking for a tasteless joke.")
        gary.yoMamma()
          .then(joke => ch.send(joke))
          .catch(e => console.error(e));
      break;

      case cmds.pup:
        lib.log(user, "asking for a doggo.")
        gary.doggo()
          .then(pupLink => ch.send(pupLink))
          .catch(e => console.error(e));
      break;

      case cmds.where:
        lib.log(user, "asking for Gary's location.");
        gary.whereGary()
          .then(location => ch.send(location))
          .catch(e => console.error(e))
      break;

      default:

        if (lib.advCheck(cmds.google, command)) {
          const query = lib.getParams(cmds.google, command);
          lib.log(user, "searching for some " + "\"" + query + "\"");
          gary.google(query)
            .then(image => ch.send(image))
            .catch(e => console.error(e));
        }

        if (lib.advCheck(cmds.frinkiac, command)) {
          const query = lib.getParams(cmds.frinkiac, command);
          lib.log(user, "searching for a Simpsons reference - " + "\"" + query + "\"");
          gary.frinkiac(query)
            .then(image => ch.send(image))
            .catch(e => console.error(e))
        }

        if (lib.advCheck(cmds.tldr, command)) {
          const query = lib.getParams(cmds.tldr, command);
          lib.log(user, "summarising " + query);
          gary.tldr(query)
            .then(summary => ch.send(summary))
            .catch(e => console.error(e))
        }

    }
  } 
});

bot.login(auth.token)
