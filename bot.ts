import { Telegraf, Markup } from 'telegraf';
import * as dotenv from 'dotenv';
import http from 'http';

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

// Добавляем простой HTTP-сервер, чтобы Render не убивал процесс из-за отсутствия порта
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running!');
}).listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

bot.launch().then(() => {
  console.log('Бот успешно запущен!');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
