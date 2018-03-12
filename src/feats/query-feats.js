const queries = require("../queries.js");

module.exports = [
  {
    cmd: "show me some",
    log: (query) => "searching for some " + query,
    func: (query) =>
      (query != "") ?
      queries.google(query) :
      Promise.resolve("Show me some what you fuck.")
  },

  {
    cmd: "simpsons me",
    log: (query) => "searching for a Simpsons reference - " + query,
    func: (query) =>
      (query != "") ?
      queries.frinkiac(query) :
      Promise.resolve("Simpsons me what you fuck.")
  },

  {
    cmd: "tl;dr",
    log: (query) => "summarising " + query,
    func: (query) =>
      (query != "") ?
      queries.tldr(query) :
      Promise.resolve("TL;DR what you fuck.")
  },

  {
    cmd: "what's good on",
    log: (query) => "looking for popular threads on " + query,
    func: (query) =>
      (query != "") ?
      queries.chan(query) :
      Promise.resolve("What's good on what you fuck.")
  }
]
