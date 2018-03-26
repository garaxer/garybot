const basic_feats = require("./feats/basic-feats.js");
const query_feats = require("./feats/query-feats.js");
const feats = [].concat(
  basic_feats,
  query_feats
)

const config = require("../config.json");

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

exports.featSearch = cmd => Promise.resolve(feats.filter(f => this.featIsCmd(f.cmd, cmd))[0])

exports.featIsCmd = (feat, cmd) => this.intersectRTL(feat, cmd) == feat;

exports.diffRTL = (n, s) => s.split(" ").slice(n.split(" ").length).join(" ");

exports.intersectRTL = (n, s) => s.split(" ").slice(0, n.split(" ").length).join(" ");

exports.isTheMan = (id) => config.the_men.includes(id);

exports.log = (ch, user, task) => console.log("[" + ch.guild.name + ", #" + ch.name + "] " + "User " + user + " is " + task);

exports.editBuilder = (a, mO, mN) => ({
  embed: {
    author: {
      name: a.username + " just made an edit!",
      icon_url: a.avatarURL
    },
    fields: [{
        name: "Old Message",
        value: mO.content
      },
      {
        name: "New Message",
        value: mN.content
      }
    ]
  }
})
