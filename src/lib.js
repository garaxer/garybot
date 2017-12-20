exports.prefix = "gary,"

exports.hasPrefix = msg => {
  return splitMessage(msg).prefix == this.prefix;
}

exports.getCommand = msg => {
  return splitMessage(msg).command.join(" ");
}

const splitMessage = msg => {
  const [prefix, ...command] = msg.content.split(" ").map(x => x.toLowerCase());
  return {prefix: prefix, command: command};
}
