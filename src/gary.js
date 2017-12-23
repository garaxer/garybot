const http = require("axios");
const auth = require("../auth.json");
const lib  = require("./lib.js");
const coords = require("random-coordinates");

exports.test = () => {
  return "Success.";
}

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

exports.whereGary = () => {
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
        return this.whereGary()
      }
    })
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

exports.tldr = (query) => {
  return (query != "")
    ? lib.search("tldr", query)
    : Promise.resolve("TL;DR what you fuck")
}
