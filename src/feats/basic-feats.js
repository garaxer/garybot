const http = require("axios");
const lib = require("../lib.js");

module.exports = [

  {
    cmd: "test",
    log: () => "testing GaryBot.",
    func: () => Promise.resolve("Successful.")
  },

  {
    cmd: "what's the time",
    log: () => "asking for the time.",
    func: () => {
      const today = new Date();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const time = h + ":" + m;
      return Promise.resolve("It's " + time + " and " + s + " seconds.");
    }
  },

  {
    cmd: "thanks",
    log: () => "is thanking the GaryBot.",
    func: () => Promise.resolve("No probs, buddy.")
  },

  {
    cmd: "load up celery man",
    log: () => "asking for a nude Tayne.",
    func: () => Promise.resolve({
      file: "https://i.imgur.com/cqJ3cge.gif"
    })
  },

  {
    cmd: "who's the man",
    log: () => "asking who the man is.",
    func: (p, user) => Promise.resolve((lib.isTheMan(user)) ? "You da man!" : "You are not the man.")
  },

  {
    cmd: "tell me a joke",
    log: () => "asking for a tasteless joke.",
    func: () =>
      http.get("http://api.yomomma.info")
      .then(response => response.data.joke)
      .catch(console.error)
  },

  {
    cmd: "show me a pup",
    log: () => "asking for a pup.",
    func: () =>
      http.get("https://random.dog/woof.json")
      .then(response => response.data.url)
      .catch(console.error)
  },

  {
    cmd: "where are you",
    log: () => "asking for GaryBot's location.",
    func: () => queries.randomPlace()
  }
]
