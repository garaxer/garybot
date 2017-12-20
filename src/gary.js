const axios = require('axios');

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
  return axios.get('http://api.yomomma.info')
  .then(response => response.data.joke)
  .catch(console.error)
}
