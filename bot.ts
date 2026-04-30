import { Telegraf, Markup } from 'telegraf';
import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN must be provided!');
}

const bot = new Telegraf(token);

// Сюда мы позже вставим URL задеплоенного Web App (или ngrok для тестов)
const webAppUrl = process.env.WEB_APP_URL || 'https://example.com'; 

bot.start((ctx) => {
  ctx.reply(
    'Добро пожаловать в ARM Freelance! 🚀\nНажмите кнопку ниже, чтобы открыть приложение.',
    Markup.keyboard([
      Markup.button.webApp('Отрыть ARM Freelance', webAppUrl)
    ]).resize()
  );
});

bot.launch().then(() => {
  console.log('Бот успешно запущен!');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
