require('./config/cfg.js')
const { userController } = require('./controller/usersController.js')
const { questionController } = require('./controller/questionController.js')
const { answerController } = require('./controller/answerController.js')
const { xlsxController } = require('./controller/xlsxController.js')
const { resetController } = require('./controller/resetController.js')

bot.on('callback_query', function (msg) {
	let userC = new userController(msg.from)
	userC.getUserWithTelegramId().then(function (value) {
		let userInfo = value,
			questionC = new questionController(userInfo)
		questionC.getButtonData(msg.data).then(function (value) {
			bot.editMessageText(
				msg.message.text + `\n----------\n(${value.buttons_text})`,
				{
					chat_id: msg.message.chat.id,
					message_id: msg.message.message_id
				}
			)
			var altQuestionId = value.buttons_questions_alt,
				btnText = value.buttons_text,
				stopQuestion = {
					text: msg.message.text,
					answer: value.buttons_text
				}
			if (altQuestionId > 0) {
				questionC.getButtonAltQuestion(altQuestionId).then(function (value) {
					if (value.questions_alt_buttons == 0) {
						var answerC = new answerController()
						answerC.getAnswersByUser(userInfo.data.users_teleg_id).then(function (value) {
							var xlsxC = new xlsxController()
							xlsxC.createXLSX(value.data, 1, userInfo.data, stopQuestion)
						})
					}
					/*questionC.sendQuestions().then(function(value){
						console.log(value)
					})*/
				})
			} else {
				userC.changeStep().then(function (value) {
					if (value.status == 'changedstep') {
						userC.getUserWithTelegramId().then(function (value) {
							userInfo = value
							if (userInfo.data.users_current_step > 0) {
								var answerC = new answerController()
								answerC.saveAnswer(msg.message, userInfo, btnText).then(function (value) {
									if (value.status == 'answersaved' && value.data.breakpoint > 0) {
										var breakpoint = value.data.breakpoint
										answerC.getAnswersByUser(userInfo.data.users_teleg_id).then(function (value) {
											var xlsxC = new xlsxController()
											xlsxC.createXLSX(value.data, breakpoint, userInfo.data)
										})
									}
								})
							}
							questionC = new questionController(userInfo)
							questionC.sendQuestions().then(function (value) {
								if (value.status == 'sendedquestion') {
									userC.changeStep().then(function (value) {})
								}
							})
						})
					}
				})
			}
		})
	})
})

bot.on('message', function (msg) {
	if (msg.text === '/reset') {
		var resetC = new resetController(msg.from)
			resetC.resetUserSteps().then(function(value){
				if(value.status == 'reset'){
					bot.sendMessage(
						msg.from.id,
						'Можете начать опрос заново.'
					)
				}
			})
	} else {
		let userC = new userController(msg.from)
		userC.getUserWithTelegramId().then(function (value) {
			let userInfo = value

			if (userInfo.data.users_current_step > 0) {
				var answerC = new answerController()
				answerC.saveAnswer(msg, userInfo).then(function (value) {
					if (value.status == 'answersaved' && value.data.breakpoint > 0) {
						var breakpoint = value.data.breakpoint
						answerC.getAnswersByUser(userInfo.data.users_teleg_id).then(function (value) {
							var xlsxC = new xlsxController()
							xlsxC.createXLSX(value.data, breakpoint, userInfo.data)
						})
					}
				})
			}
			let questionC = new questionController(userInfo)
			questionC.sendQuestions().then(function (value) {
				if (value.status == 'sendedquestion') {
					userC.changeStep().then(function (value) {})
				}
			})
		})
	}
})