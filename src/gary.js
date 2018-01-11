const http = require("axios");
const auth = require("../auth.json");
const lib = require("./lib.js");

exports.feats = [

  {
      cmd: "test.",
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
      cmd: "load up celery man.",
      log: () => "asking for a nude Tayne.",
      func: () => Promise.resolve({ file: "https://i.imgur.com/cqJ3cge.gif" })
  },

  {
      cmd: "who's the man?",
      log: () => "asking who the man is.",
      func: (p, user) => Promise.resolve((lib.isTheMan(user)) ? "You da man!" : "You are not the man.")
  },

  {
      cmd: "tell me a joke.",
      log: () => "asking for a tasteless joke.",
      func: () => {
          return http.get("http://api.yomomma.info")
          .then(response => response.data.joke)
          .catch(console.error)
      }
  },

  {
      cmd: "show me a pup.",
      log: () => "asking for a pup.",
      func: () => {
          return http.get("https://random.dog/woof.json")
          .then(response => response.data.url)
          .catch(console.error)
      }
  },

  {
      cmd: "where are you?",
      log: () => "asking for GaryBot's location.",
      func: () => lib.search("randomPlace")
  },

  {
      cmd: "show me some",
      log: (query) => "searching for some " + query,
      func: (query) => {
          return (query != "")
          ? lib.search("google", query)
          : Promise.resolve("Show me some what you fuck.")
      }
  },

  {
      cmd: "simpsons me",
      log: (query) => "searching for a Simpsons reference - " + query,
      func: (query) => {
          return (query != "")
          ? lib.search("frinkiac", query)
          : Promise.resolve("Simpsons me what you fuck.")
      }
  },

  {
      cmd: "tl;dr",
      log: (query) => "summarising " + query,
      func: (query) => {
          return (query != "")
          ? lib.search("tldr", query)
          : Promise.resolve("TL;DR what you fuck")
      }
  },

  {
      cmd: "what's good on",
      log: (query) => "looking for popular threads on " + query,
      func: (query) => {
          return (query != "")
            ? lib.search("4chan", query)
            : Promise.resolve("What's good on what you fuck.")
      }
  },
]