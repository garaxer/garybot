const http = require("axios");
const auth = require("../auth.json")
const lib  = require("./lib.js")

exports.time = () => {
  const today = new Date();
  const h = today.getHours();
  const m = today.getMinutes();
  const s = today.getSeconds();
  const time = h + ":" + m;
  return "It's " + time + " and " + s + " seconds.";
}

exports.youWelcome = () => {
  return "No probs."
}

exports.yoMamma = () => {
  return http.get("http://api.yomomma.info")
  .then(response => response.data.joke)
  .catch(console.error)
}

exports.doggo = () => {
  return http.get("https://random.dog/woof.json")
    .then(response => response.data.url)
    .catch(console.error)
}

exports.google = (query) => {
  return (query != "")
    ? lib.search("google", query)
    : Promise.resolve("Show me some what you fuck.")
}

exports.frinkiac = (query) => {
  return (query != "")
    ? lib.search("frinkiac", query)
    : Promise.resolve("Simpsons me what you fuck.")
}
