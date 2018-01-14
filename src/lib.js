const http   = require("axios");
const auth   = require("../auth.json");
const coords = require("random-coordinates");
const gary   = require("./gary.js").feats;

const prefix = "gary,";
const suffix = "gary.";

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

const chan = (board) => "https://a.4cdn.org" + board + "catalog.json"

const sortChan = (board) => {
  var sorted = [];
  for (i in board) {
    const threads = board[i].threads
    for (j in threads) {
      sorted.push({
        no      : threads[j].no,
        replies : threads[j].replies
      });
    }
  }

  sorted.sort((a,b) => {
    let comparison = 0;
    if (a.replies > b.replies) {
      comparison = -1;
    } else if (a.replies < b.replies) {
      comparison = 1;
    }
    return comparison;
  });

  return sorted;
}

exports.getMap = (coords) =>
    "https://maps.googleapis.com/maps/api/geocode/json" +
    "?latlng=" + coords +
    "&key=" + auth.google_map;

exports.hasPrefix = msg => {
    return splitMessage(msg).prefix == prefix;
}

exports.getCommand = msg => {
    const cmd = splitMessage(msg).command.join(" ");
    const punct = cmd.split("").splice(-1);
    return (punct == '.' || punct == '?')
      ? cmd.slice(0, -1)
      : cmd;
}

exports.featSearch = cmd => Promise.resolve(gary.filter( f => this.featCheck(f.cmd, cmd))[0])

exports.featCheck = (func, cmd) => {
  return cmd.split(" ").slice(0, func.split(" ").length).join(" ") == func;
}

exports.getParams = (func, cmd) => {
    return cmd.split(" ").slice(func.split(" ").length).join(" ");
}

exports.getSuffixCommand = msg => {
    return splitSuffixMessage(msg).command.join(" ");
}

exports.hasSuffix = msg => {
    return splitSuffixMessage(msg).suffix.includes(suffix);
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

    case "4chan":
      return http.get(chan(query))
        .then(response => response.data)
        .then(boards => sortChan(boards)[0])
        .then(thread =>
          "This thread has the most replies on " + query + ":\n" +
          "http://boards.4chan.org" + query + "thread/" + thread.no)
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

const splitSuffixMessage = msg => {
    const [...command] = msg.content.split(" ").map(x => x.toLowerCase());
    return {suffix: command.slice(-1)[0], command: command.slice(0, -1)};
}
