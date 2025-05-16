const axios = require('axios');

const meta = {
  name: "cleus",
  version: "0.0.1",
  aliases: [],
  description: "Ask Cleus AI anything",
  author: "Hazeyy API",
  prefix: "both",
  category: "ai",
  type: "anyone",
  cooldown: 5,
  guide: "[your question]"
};

async function onStart({ bot, args, message, msg, usages }) {
  try {
    const question = args.join(" ");

    if (!question) {
      return usages();
    }

    const response = await axios.get(`${global.api.hazeyy}/api/cleus?message=${encodeURIComponent(question)}`);

    if (response.data && response.data.cleus) {
      return message.reply(`${response.data.cleus}`);
    } else {
      return message.reply("Cleus AI couldn't generate a response. Please try again later.");
    }
  } catch (error) {
    console.error(`[ ${meta.name} ] » ${error}`);
    return message.reply(`[ ${meta.name} ] » An error occurred while connecting to Cleus AI.`);
  }
}

module.exports = { meta, onStart };