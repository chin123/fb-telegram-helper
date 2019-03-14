const login = require("facebook-chat-api");
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const messengerID = process.env.MESSENGER_ID;
const telegramID = process.env.TELEGRAM_ID;
const messengerName = process.env.FB_NAME;
const bot = new TelegramBot(token, {polling: true});

login({email: process.env.FB_EMAIL, password: process.env.FB_PASSWORD}, (err, api) => {
	if(err) return console.error(err);
	api.setOptions({selfListen: true});

	var stopListening = api.listen((err, message) => {
		if (err) return console.error(err);

		console.log(message.threadID + ": " + message.body);
		if (message.threadID == messengerID) {
			api.getUserInfo(message.senderID, (err, ret) => {
				if(err) return console.error(err);
				for (var prop in ret) {
					bot.sendMessage(telegramID, ret[prop].name + ": " + message.body);
				}
			});
		}
	});
	bot.on('message', (msg) => {
		const chatId = msg.chat.id;
		if (chatId == telegramID) {
			var message = msg.text;
			api.sendMessage(messengerName + ": " + message, messengerID);
		}
	});
});
