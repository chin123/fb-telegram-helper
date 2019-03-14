#!/bin/node
const login = require("facebook-chat-api");
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});


// Create simple echo bot
login({email: process.env.FB_EMAIL, password: process.env.FB_PASSWORD}, (err, api) => {
	if(err) return console.error(err);
	api.setOptions({selfListen: true});

	var stopListening = api.listen((err, message) => {
		if (err) return console.error(err);

		console.log(message.threadID + ": " + message.body);
		if (message.threadID == 1558398277597596) {
			api.getUserInfo(message.senderID, (err, ret) => {
				if(err) return console.error(err);
				for (var prop in ret) {
					bot.sendMessage(765650906, ret[prop].name + ": " + message.body);
				}
			});
		}
	});
	bot.on('message', (msg) => {
		const chatId = msg.chat.id;
		var message = msg.text;
		api.sendMessage("Chirag Nanda: " + message, 1558398277597596);
	});
});

