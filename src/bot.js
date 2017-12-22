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
        ch.send("Success.");
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
          .catch(error => console.error(error));
        break;

      case "show me a pup.":
        lib.log(user, "asking for a doggo.")
        gary.doggo()
          .then(pupLink => ch.send(pupLink))
          .catch(error => console.error(error));
        break;

      default:

        if (lib.advCheck("show me some", command)) {
          const query = lib.getQuery(command);
          lib.log(user, "searching for some " + "\"" + query + "\"")
          gary.google(query)
            .then(image => ch.send(image))
            .catch(error => console.error(error));
        }

        if (lib.advCheck("simpsons me", command)) {
          const query = lib.getSimpsons(command);
          lib.log(user, "searching for a Simpsons reference - " + "\"" + query + "\"")
          gary.frinkiac(query)
            .then(image => ch.send(image))
            .catch(error => console.error(error))
        }

    }
  }

});

bot.login(auth.token)
