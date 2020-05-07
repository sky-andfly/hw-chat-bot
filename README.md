# Телеграм бот
Бот для опроса потенциальных сотрудников школы программирования
## Установка
Зависимости
```
npm i
```
Создать БД chat_bot, импортировать файл
```
chat_bot.sql
```
По пути изменить настройки подключения к БД
```
/config/db.js
```
```
  host: "your_host",
  user: "your_user",
  database: "chat_bot",
  password: "your_pass"
```
Файл cfg.js
```
/config/cfg.js
```
```
token = 'YOUR_TELEGRAM_BOT_TOKEN'
bot = new TelegramBot(token, { polling: true })

mailTo = 'КОМУ_БУДУТ_ОТПРАВЛЕНЫ_РЕЗУЛЬТАТЫ' //coo@hwschool.online

transporter = nodemailer.createTransport(
    {
        host: 'SMTP_HOST',
        port: 465,
        secure: true,
        auth: {
            user: 'YOUR_LOGIN',
            pass: 'YOUR_PASS'
        }
    },
    {
        from: `ОТ_КОГО_ПИСЬМО ВАША_ПОЧТА`
    }
)
```
### Запуск
Перед запуском бота, в корне проекта проверьте наличие папки users, если ее нет, то создайте.

В папке проекта
```
node index.js
```
