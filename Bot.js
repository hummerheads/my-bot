require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.bot_Hash); // Replace with your bot token
const webLink = process.env.weblink;

bot.start((ctx) => {
  const userId = ctx.from.id;
  const startPayload = ctx.startPayload || ''; // Ensure it's a string
  let source = 'default_source'; // Set a default source

  // Check if the start payload contains a referral code
  if (startPayload.startsWith('referral_')) {
    source = startPayload.substring('referral_'.length);
  }

  console.log(`User ID: ${userId}`);
  console.log(`Source: ${source}`);

  ctx.reply('Welcome! Click the button below to visit our site and play:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Play",
            web_app: { url: `${webLink}?user_id=${userId}&source=${source}` }
          }
        ]
      ]
    }
  });
});

bot.catch((err, ctx) => {
  console.error(`Error encountered for ${ctx.updateType}:`, err);
});

bot.launch().then(() => {
  console.log('Bot is running...');
});
