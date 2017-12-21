const http = require("axios");
const auth = require("../auth.json")

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

exports.search = (query) => {
  if (query != "") {
    return http.get(
      "https://www.googleapis.com/customsearch/v1" +
      "?key=" + auth.google +
      "&cx=" + auth.searchID +
      "&searchType=image" +
      "&q=" + query)
      .then(response => response.data.items[0].link)
      .catch(console.error)
  } else {
    return Promise.resolve("Show me some what you fuck.")
  }
}

exports.frinkiac = (query) => {
  if (query != "") {
    return http.get("https://frinkiac.com/api/search?q=" + query)
    .then(response => response.data[0])
    .then(data => "https://frinkiac.com/meme/" + data.Episode + "/" + data.Timestamp)
    .catch(console.error)
  } else {
    return Promise.resolve("Simpsons me what you fuck.")
  }
}
