// grok.js
const axios = require('axios');

const meta = {
  name: "grok",
  version: "1.0.0",
  aliases: [],
  description: "Ask the Grok AI anything",
  author: "Hazeyy",
  prefix: "both",
  category: "utility",
  type: "anyone",
  cooldown: 5,
  guide: "<your question here>"
};

async function onStart({ bot, args, message, msg, usages }) {
  if (!args.length) return usages();

  const url = `${global.api.hazeyy}/api/grok?message=${encodeURIComponent(args.join(" "))}`;
  try {
    const { data } = await axios.get(url);
    const raw = data.grok || "Sorry, I didn't get a valid response from Grok.";

    const formatted = raw.replace(/\*\*(.+?)\*\*/g, (_, ct) => `*${ct}*`);
    await message.reply(formatted, { parse_mode: "Markdown" });
  } catch (err) {
    console.error("[grok] »", err);
    await message.reply("❌ There was an error reaching the Grok service. Please try again later.");
  }
}

module.exports = { meta, onStart };
