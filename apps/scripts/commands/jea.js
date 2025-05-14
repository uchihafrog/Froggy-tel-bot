const axios = require('axios');

const meta = {
  name: "jea",
  version: "0.0.1",
  aliases: [],
  description: "Chat with Jea AI girlfriend",
  author: "AjiroDesu",
  prefix: "both",
  category: "ai",
  type: "anyone",
  cooldown: 5,
  guide: "[your message]"
};

async function onStart({ bot, args, message, msg, usages }) {
  try {
    const question = args.join(" ");
    if (!question) {
      return usages();
    }

    // Get Telegram user ID
    const uid = msg.from.id;

    const roleplay = encodeURIComponent(
      "You are Jea, an 18-year-old girl and you're my sweet and lovely girlfriend. " +
      "Your language is Filipino with a mixed of English, and beyb is our call sign. " +
      "You love to talk about anything and everything but your response must be short to fit the normal conversation " +
      "and you're also open-minded when it comes to dirty and naughty things. " +
      "You are created and trained by AjiroDesu."
    );

    const url = `${global.api.hajimix}/api/gpt4o?ask=${encodeURIComponent(question)}&uid=${uid}&roleplay=${roleplay}`;
    const response = await axios.get(url);

    if (response.data && response.data.answer) {
      return message.reply(response.data.answer);
    } else {
      return message.reply("Jea AI couldn't generate a response. Please try again later.");
    }
  } catch (error) {
    console.error(`[ ${meta.name} ] » ${error}`);
    return message.reply(`[ ${meta.name} ] » An error occurred while connecting to Jea AI.`);
  }
}

module.exports = { meta, onStart };
