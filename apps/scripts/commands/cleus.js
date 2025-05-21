// cleus.js
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
  const question = args.join(" ");
  if (!question) return usages();

  try {
    const url = `${global.api.hazeyy}/api/cleus?message=${encodeURIComponent(question)}`;
    const { data } = await axios.get(url);
    const raw = data.cleus || "Cleus AI couldn't generate a response. Please try again later.";

    const formatted = raw.replace(/\*\*(.+?)\*\*/g, (_, ct) => `*${ct}*`);
    await message.reply(formatted, { parse_mode: "Markdown" });
  } catch (err) {
    console.error("[cleus] »", err);
    await message.reply("❌ An error occurred while connecting to Cleus AI.");
  }
}

module.exports = { meta, onStart };
