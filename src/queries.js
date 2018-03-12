const http = require("axios");
const coords = require("random-coordinates");
const auth = require("../auth.json");

const google =
  "https://www.googleapis.com/customsearch/v1" +
  "?key=" + auth.google +
  "&cx=" + auth.searchID +
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
        no: threads[j].no,
        replies: threads[j].replies,
        thumb: threads[j].tim + "s.jpg",
        text: threads[j].com,
        subject: threads[j].sub
      });
    }
  }
  sorted.sort((a, b) => {
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

const google_map = (coords) =>
  "https://maps.googleapis.com/maps/api/geocode/json" +
  "?latlng=" + coords +
  "&key=" + auth.google_map

module.exports = {

  google: query =>
    http.get(google + query)
    .then(response => response.data.items[0].link)
    .catch(console.error),

  frinkiac: query =>
    http.get(frinkiac + query)
    .then(response => response.data[0])
    .then(data => "https://frinkiac.com/meme/" + data.Episode + "/" + data.Timestamp)
    .catch(console.error),

  tldr: query =>
    http.get(tldr + query)
    .then(response => (response.data.sm_api_content))
    .then(summary => summary.replace(/\[BREAK\]/g, "\n\n"))
    .catch(console.error),

  randomPlace: () =>
    http.get(google_map(coords({
      fixed: 7
    }).split(" ").join("")))
    .then(response => {
      if (response.data.status == "OK") {
        const place = response.data.results[0];
        return "I think I'm in " +
          place.formatted_address + "\n" +
          "https://www.google.com.au/maps/place/" +
          place.geometry.location.lat + "," +
          place.geometry.location.lng
      } else {
        return module.exports.randomPlace();
      }
    })
    .catch(console.error),

  chan: query =>
    http.get(chan(query))
    .then(response => response.data)
    .then(boards => sortChan(boards)[0])
    .then(thread => ({
      embed: {
        color: 3066993,
        author: {
          name: query,
          icon_url: "https://i.imgur.com/LtxYlXL.png"
        },
        title: thread.subject,
        url: "http://boards.4chan.org" + query + "thread/" + thread.no,
        description: thread.text,
        thumbnail: {
          url: "https://i.4cdn.org" + query + thread.thumb
        }
      }
    }))
    .catch(console.error)
}
