const http   = require("axios");
const auth   = require("../auth.json");
const coords = require("random-coordinates");
const gary   = require("./gary.js").feats;

const prefix = "gary,";

const google =
  "https://www.googleapis.com/customsearch/v1" +
  "?key="        + auth.google   +
  "&cx="         + auth.searchID +
  "&searchType=image&q=";

const frinkiac =
  "https://frinkiac.com/api/search?q=";

const tldr =
  "http://api.smmry.com/" +
  "SM_API_KEY=" + auth.tldr +
  "&SM_WITH_BREAK" +
  "&SM_LENGTH=4" +
  "&SM_URL=";

exports.getMap = (coords) =>
  "https://maps.googleapis.com/maps/api/geocode/json" +
  "?latlng=" + coords +
  "&key=" + auth.google_map;

exports.hasPrefix = msg => {
  return splitMessage(msg).prefix == prefix;
}

exports.getCommand = msg => {
  return splitMessage(msg).command.join(" ");
}

exports.featSearch = cmd => Promise.resolve(gary.filter( f => this.featCheck(f.cmd, cmd))[0])

exports.featCheck = (func, cmd) => {
  return cmd.split(" ").slice(0, func.split(" ").length).join(" ") == func;
}

exports.getParams = (func, cmd) => {
  return cmd.split(" ").slice(func.split(" ").length).join(" ");
}

exports.search = (type, query) => {
  switch (type) {

    case "google":
      return http.get(google + query)
        .then(response => response.data.items[0].link)
        .catch(console.error)
      break;

    case "frinkiac":
      return http.get(frinkiac + query)
        .then(response => response.data[0])
        .then(data => "https://frinkiac.com/meme/" + data.Episode + "/" + data.Timestamp)
        .catch(console.error)
      break;

    case "tldr":
      return http.get(tldr + query)
        .then(response => (response.data.sm_api_content))
        .then(summary => summary.replace(/\[BREAK\]/g, "\n\n"))
        .catch(console.error)
      break;

    case "randomPlace":
      return http.get(this.getMap(coords({ fixed: 7 }).split(" ").join("")))
        .then(response => {
          if (response.data.status == "OK") {
            const place = response.data.results[0];
            return "I think I'm in "
            + place.formatted_address + "\n"
            + "https://www.google.com.au/maps/place/"
            + place.geometry.location.lat + ","
            + place.geometry.location.lng
          } else {
            return this.search("randomPlace")
          }
        })
        .catch(console.error)
      break;
  }
}

exports.isTheMan = (id) => (id == "186723484699721728" || id == "182083904545488896");

exports.log = (user, task) => {
  console.log("User " + user + " is " + task);
}

const splitMessage = msg => {
  const [prefix, ...command] = msg.content.split(" ").map(x => x.toLowerCase());
  return {prefix: prefix, command: command};
}
