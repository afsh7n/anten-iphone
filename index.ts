import {Telegraf} from 'telegraf';
const fs = require('fs')
// @ts-ignore
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file

const AntenIphoneProfileGenerator = require('./Services/ProfileGenerator/index');

const BOT_TOKEN = process.env.BOT_TOKEN as string;

const HelpText = `راهنما:
1-ابتدا ریست نتورک را انجام دهید 🔄
2-فایل کانفیگ ساخته شده را دانلود کنید و سپس بر روی آن کلیک کنید تا باز شود، سپس آن را در فایل ذخیره کنید 💾
3-سپس به فایل منیجر بروید و روی کانفیگ کلیک کنید تا یک پیام بالا بیاید و اماده نصب شود 📂
4-سپس وارد تنظیمات بخش VPN و Device Management شوید، پروفایل را انتخاب کرده و نصب کنید 📲
5-بعد از نصب، به بخش Cellular Data بروید، تیک Data Roaming و VoLTE را بر روی 5G یا LTE بزنید، سپس گوشی را روشن و خاموش کنید تا آنتن برگردد 📶
6-حالا بر روی لینک شورتکات کلیک کنید 
https://www.icloud.com/shortcuts/9b2f6b908fb74058b2b1bf3ed4d08451
از توی شورتکات روی Anten کلیک کرده و نصبش کنید 📱

و اگه انتن قطع شد با فعال کردن Shortcut میتونید مجدد راه اندازی کنید 🔄`

const bot = new Telegraf(BOT_TOKEN!)

const DefaultCtx = (ctx:any) => {
    ctx.reply('🇮🇷لطفا اپراتور خود را انتخاب کنید', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'همراه اول(پیشنهادی)', callback_data: 'HamrahAval' }],
                [{ text: 'ایرانسل', callback_data: 'Irancell' }],
                [{ text: 'رایتل', callback_data: 'Rightel' }]
            ]
        }
    });
}
bot.start(DefaultCtx);
// callback query handler
bot.on('callback_query', (ctx:any) => {
    let typeOperator = ctx.callbackQuery.data;
    let profile = AntenIphoneProfileGenerator.generateProfile(typeOperator);
    ctx.replyWithDocument({ source: profile })
    ctx.reply(HelpText);
    setTimeout(() => {
        //check file exist and delete it
        if (fs.existsSync(profile)) {
            fs.unlinkSync(profile);
        }
    }, 1000 * 60);
});

// help command handler
bot.help(DefaultCtx);
bot.on('text', DefaultCtx);
bot.launch();