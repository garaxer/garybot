const http = require("axios");
const auth = require("../auth.json");
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

exports.hasPrefix = msg => {
  return splitMessage(msg).prefix == prefix;
}

exports.getCommand = msg => {
  return splitMessage(msg).command.join(" ");
}

exports.advCheck = (func, cmd) => {
  return cmd.split(" ").slice(0, func.split(" ").length).join(" ") == func;
}

exports.getQuery = cmd => {
  return cmd.split(" ").slice(3).join(" ");
}

exports.getSimpsons = cmd => {
  return cmd.split(" ").slice(2).join(" ");
}

exports.getTldr = cmd => {
  return cmd.split(" ").slice(1).join(" ");
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
  }
}

exports.log = (user, task) => {
  console.log("User " + user + " is " + task);
}

const splitMessage = msg => {
  const [prefix, ...command] = msg.content.split(" ").map(x => x.toLowerCase());
  return {prefix: prefix, command: command};
}
