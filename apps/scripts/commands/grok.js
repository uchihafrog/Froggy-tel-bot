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
  if (!args.length) {
    return usages();
  }

  const query = encodeURIComponent(args.join(" "));
  const url = `${global.api.hazeyy}/api/grok?message=${query}`;

  try {
    const { data } = await axios.get(url);
    if (data && data.grok) {
      await message.reply(data.grok);
    } else {
      await message.reply("Sorry, I didn't get a valid response from Grok.");
    }
  } catch (err) {
    console.error("Error calling Grok API:", err);
    await message.reply("❌ There was an error reaching the Grok service. Please try again later.");
  }
}

module.exports = { meta, onStart };
