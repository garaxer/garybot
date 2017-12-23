const Discord = require("discord.js");
const auth    = require("../auth.json");
const lib     = require("./lib.js");
const gary    = require("./gary.js");

const bot     = new Discord.Client();

bot.on("ready", () => {
  console.log("All systems nominal.");
});

bot.on("message", message => {
  if (lib.hasPrefix(message)) {

    const ch      = message.channel;
    const user    = message.author.username;
    const command = lib.getCommand(message);

    switch (command) {

      case "test.":
        lib.log(user, "testing GaryBot.")
        ch.send(gary.test());
      break;

      case "what's the time?":
        lib.log(user, "asking for the time.")
        ch.send(gary.time());
      break;

      case "thanks.":
        lib.log(user, "giving thanks to the GaryBot.")
        ch.send(gary.youWelcome());
      break;

      case "load up celery man.":
        lib.log(user, "asking for a nude Tayne.")
        ch.send({
          file: "https://i.imgur.com/cqJ3cge.gif"
        });
      break;

      case "tell me a joke.":
        lib.log(user, "asking for a tasteless joke.")
        gary.yoMamma()
          .then(joke => ch.send(joke))
          .catch(e => console.error(e));
      break;

      case "show me a pup.":
        lib.log(user, "asking for a doggo.")
        gary.doggo()
          .then(pupLink => ch.send(pupLink))
          .catch(e => console.error(e));
      break;

      case "where are you?":
        lib.log(user, "asking for Gary's location.");
        gary.whereGary()
          .then(location => ch.send(location))
          .catch(e => console.error(e))
      break;

      default:

        if (lib.advCheck("show me some", command)) {
          const query = lib.getQuery(command);
          lib.log(user, "searching for some " + "\"" + query + "\"");
          gary.google(query)
            .then(image => ch.send(image))
            .catch(e => console.error(e));
        }

        if (lib.advCheck("simpsons me", command)) {
          const query = lib.getSimpsons(command);
          lib.log(user, "searching for a Simpsons reference - " + "\"" + query + "\"");
          gary.frinkiac(query)
            .then(image => ch.send(image))
            .catch(e => console.error(e))
        }

        if (lib.advCheck("tl;dr", command)) {
          const query = lib.getTldr(command);
          lib.log(user, "summarising " + query);
          gary.tldr(query)
            .then(summary => ch.send(summary))
            .catch(e => console.error(e))
        }

    }
  }

});

bot.login(auth.token)
