const Discord = require("discord.js");
const auth    = require("../auth.json");
const lib     = require("./lib.js");
const gary    = require("./gary.js");

const bot     = new Discord.Client();

bot.on("ready", () => {
  console.log("All systems nominal.");
});

bot.on("message", message => {

  const ch = message.channel;
  if (lib.hasPrefix(message)) {
    switch (lib.getCommand(message)) {

      case "test.":
        ch.send("Success.");
        break;

      case "what's the time?":
        ch.send(gary.time());
        break;

      case "thanks.":
        ch.send(gary.youWelcome());
        break;

      case "tell me a joke.":
        gary.yoMamma()
          .then(joke => ch.send(joke))
          .catch( error => console.log(error));
        break;
    }
  }

});

bot.login(auth.token)
