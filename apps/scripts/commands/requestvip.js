const meta = {
  name: "requestvip",
  aliases: [],
  version: "1.0.0",
  author: "ShawnDesu",
  description: "Request VIP access",
  guide: ["<your message>"],
  cooldown: 100,
  type: "anyone",
  category: "system"
};

async function onStart({ bot, msg, message, args, usages }) {
  try {
    // Join all args into the message text
    const text = args.join(" ").trim();
    if (!text) {
      // If no content, show usage guide
      await usages();
      return;
    }

    // Determine display name (first + last or fallback to username)
    const from = msg.from;
    const first = from.first_name?.trim() || "";
    const last = from.last_name?.trim() || "";
    const displayName = (first || last)
      ? `${first}${last ? " " + last : ""}`
      : from.username || "Unknown user";

    // Build the notification for operators
    const requestMessage =
      `${displayName} is requesting VIP access\n\n` +
      `User ID: ${from.id}\n` +
      `Message: ${text}`;

    // Send to all admins
    const admins = Array.isArray(global.settings.admin) ? global.settings.admin : [];
    await Promise.all(
      admins.map(id =>
        bot.sendMessage(id, requestMessage)
           .catch(err => console.error(`→ failed to send to ${id}:`, err))
      )
    );

    // Confirm back to the user using message.reply
    await message.reply("✅ Your request has been sent to the bot operators.");
  } catch (err) {
    console.error("requestvip error:", err);
    await message.reply(`❌ An error occurred: ${err.message}`);
  }
}

module.exports = { meta, onStart };
