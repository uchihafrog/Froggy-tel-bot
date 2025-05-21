// claude.js
const axios = require('axios');

const meta = {
  name: "claude",
  aliases: ["claudeai"],
  prefix: "both",
  version: "1.0.0",
  author: "Hazeyy API",
  description: "Ask Claude AI",
  guide: "<query>",
  cooldown: 5,
  type: "anyone",
  category: "ai"
};

async function onStart({ bot, args, message, msg, usages }) {
  const question = args.join(" ");
  if (!question) return usages();

  try {
    const url = `${global.api.hazeyy}/api/claude?message=${encodeURIComponent(question)}`;
    const { data } = await axios.get(url);
    const raw = data.claude || "No response was returned from the API.";

    // **bold** → *bold*
    const formatted = raw.replace(/\*\*(.+?)\*\*/g, (_, ct) => `*${ct}*`);
    await message.reply(formatted, { parse_mode: "Markdown" });
  } catch (err) {
    console.error("[claude] »", err);
    await message.reply("❌ An error occurred while fetching the Claude response.");
  }
}

module.exports = { meta, onStart };
