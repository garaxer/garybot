exports.prefix = "gary,"

exports.hasPrefix = msg => {
  return splitMessage(msg).prefix == this.prefix;
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

exports.log = (user, task) => {
  console.log("User " + user + " is " + task);
}

const splitMessage = msg => {
  const [prefix, ...command] = msg.content.split(" ").map(x => x.toLowerCase());
  return {prefix: prefix, command: command};
}
