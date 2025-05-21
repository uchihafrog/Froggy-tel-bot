// jea.js
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
  const question = args.join(" ");
  if (!question) return usages();

  try {
    const uid = msg.from.id;
    const roleplay = encodeURIComponent(
      "You are Jea, an 18-year-old girl and you're my sweet and lovely girlfriend. " +
      "Your language is Filipino with a mixed of English, and beyb is our call sign. " +
      "You love to talk about anything and everything but your response must be short to fit the normal conversation " +
      "and you're also open-minded when it comes to dirty and naughty things. " +
      "You are created and trained by AjiroDesu."
    );
    const url = `${global.api.hajimix}/api/gpt4o?ask=${encodeURIComponent(question)}&uid=${uid}&roleplay=${roleplay}`;
    const { data } = await axios.get(url);
    const raw = data.answer || "Jea AI couldn't generate a response. Please try again later.";

    const formatted = raw.replace(/\*\*(.+?)\*\*/g, (_, ct) => `*${ct}*`);
    await message.reply(formatted, { parse_mode: "Markdown" });
  } catch (err) {
    console.error("[jea] »", err);
    await message.reply("❌ An error occurred while connecting to Jea AI.");
  }
}

module.exports = { meta, onStart };
