const feats = require("./feats.js");

const prefix = "gary,";
const suffix = "gary.";

const splitMessage = {
  p: content => {
    const [gary, ...command] = content.split(" ").map(x => x.toLowerCase());
    return {
      gary: gary,
      command: command
    };
  },

  s: content => {
    const message = content.split(" ").map(x => x.toLowerCase());
    return {
      gary: message.slice(-1)[0],
      command: message.slice(0, -1)
    };
  }
}

const hasPrefix = content => splitMessage.p(content).gary == prefix;

const hasSuffix = content => splitMessage.s(content).gary == suffix;

const stripPunc = cmd => {
  const puncs = ['.', '?', '!', ','];
  const last = cmd.slice(-1);
  return (puncs.includes(last)) ?
    cmd.slice(0, -1) :
    cmd;
}

exports.isCommand = content => (hasPrefix(content) || hasSuffix(content))

exports.getCommand = content => {
  if (hasPrefix(content)) {
    const cmd = splitMessage.p(content).command.join(" ");
    return stripPunc(cmd);
  } else if (hasSuffix(content)) {
    const cmd = splitMessage.s(content).command.join(" ");
    return stripPunc(cmd);
  }
}

exports.featSearch = cmd => Promise.resolve(feats.filter(f => this.featCheck(f.cmd, cmd))[0])

exports.featCheck = (func, cmd) => cmd.split(" ").slice(0, func.split(" ").length).join(" ") == func;

exports.getParams = (func, cmd) => cmd.split(" ").slice(func.split(" ").length).join(" ");

exports.isTheMan = (id) => (id == "186723484699721728" || id == "182083904545488896");

exports.log = (user, task) => console.log("User " + user + " is " + task);
