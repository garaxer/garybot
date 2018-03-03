const feats = require("./feats.js");

const prefix = "gary,";
const suffix = "gary.";

const splitMessage = {
  p: msg => {
    const [gary, ...command] = msg.content.split(" ").map(x => x.toLowerCase());
    return {
      gary: gary,
      command: command
    };
  },

  s: msg => {
    const message = msg.content.split(" ").map(x => x.toLowerCase());
    const command = message.slice(0, -1);
    const gary = message.slice(-1)[0];
    return {
      gary: gary,
      command: command
    };
  }
}

const hasPrefix = msg => splitMessage.p(msg).gary == prefix;

const hasSuffix = msg => splitMessage.s(msg).gary == suffix;

const stripPunc = cmd => {
  const puncs = ['.', '?', '!', ','];
  const last = cmd.slice(-1);
  return (puncs.includes(last)) ?
    cmd.slice(0, -1) :
    cmd;
}

exports.isCommand = msg => (hasPrefix(msg) || hasSuffix(msg))

exports.getCommand = msg => {
  if (hasPrefix(msg)) {
    const cmd = splitMessage.p(msg).command.join(" ");
    return stripPunc(cmd);
  } else if (hasSuffix(msg)) {
    const cmd = splitMessage.s(msg).command.join(" ");
    return stripPunc(cmd);
  }
}

exports.featSearch = cmd => Promise.resolve(feats.filter(f => this.featCheck(f.cmd, cmd))[0])

exports.featCheck = (func, cmd) => cmd.split(" ").slice(0, func.split(" ").length).join(" ") == func;

exports.getParams = (func, cmd) => cmd.split(" ").slice(func.split(" ").length).join(" ");

exports.isTheMan = (id) => (id == "186723484699721728" || id == "182083904545488896");

exports.log = (user, task) => console.log("User " + user + " is " + task);
