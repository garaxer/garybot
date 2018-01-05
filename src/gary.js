const http = require("axios");
const auth = require("../auth.json");
const lib  = require("./lib.js");
const coords = require("random-coordinates");

exports.cmds = {

  // Basic Commands
  test      : "test.",
  time      : "what's the time?",
  thanks    : "thanks.",
  celery    : "load up celery man",
  man       : "who's the man?",
  joke      : "tell me a joke.",
  pup       : "show me a pup.",
  where     : "where are you?",

  // Advanced Commands
  google    : "show me some",
  frinkiac  : "simpsons me",
  tldr      : "tl;dr",
}

exports.funcs = {

  test: () => {
    return "Successful.";
  },

  time: () => {
    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes();
    const s = today.getSeconds();
    const time = h + ":" + m;
    return "It's " + time + " and " + s + " seconds.";
  },

  youWelcome: () => {
    return "No probs."
  },

  yoMamma: () => {
    return http.get("http://api.yomomma.info")
    .then(response => response.data.joke)
    .catch(console.error)
  },

  doggo: () => {
    return http.get("https://random.dog/woof.json")
    .then(response => response.data.url)
    .catch(console.error)
  },

  whereGary: () => {
    return http.get(lib.getMap(coords({ fixed: 7 }).split(" ").join("")))
    .then(response => {
      if (response.data.status == "OK") {
        const place = response.data.results[0];
        return "I think I'm in "
        + place.formatted_address + "\n"
        + "https://www.google.com.au/maps/place/"
        + place.geometry.location.lat + ","
        + place.geometry.location.lng
      } else {
        return this.funcs.whereGary()
      }
    })
    .catch(console.error)
  },

  whoDaMan: (id) =>
    (id == "186723484699721728" || id == "182083904545488896")
      ? "You da man."
      : "You are not the man.",

  google: (query) => {
    return (query != "")
    ? lib.search("google", query)
    : Promise.resolve("Show me some what you fuck.")
  },

  frinkiac: (query) => {
    return (query != "")
    ? lib.search("frinkiac", query)
    : Promise.resolve("Simpsons me what you fuck.")
  },

  tldr: (query) => {
    return (query != "")
    ? lib.search("tldr", query)
    : Promise.resolve("TL;DR what you fuck")
  }
}
