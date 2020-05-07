-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 192.168.0.102:3306
-- Время создания: Апр 29 2020 г., 20:35
-- Версия сервера: 10.3.13-MariaDB-log
-- Версия PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `chat_bot`
--

-- --------------------------------------------------------

--
-- Структура таблицы `answers`
--

CREATE TABLE `answers` (
  `answers_id` int(12) NOT NULL,
  `answers_user_teleg_id` int(12) NOT NULL,
  `answers_question_id` int(3) NOT NULL,
  `answers_question_step` int(3) NOT NULL,
  `answers_question_text` mediumtext NOT NULL,
  `answers_text` varchar(1000) NOT NULL,
  `answers_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `buttons`
--

CREATE TABLE `buttons` (
  `buttons_id` int(12) NOT NULL,
  `buttons_text` mediumtext NOT NULL,
  `buttons_questions_alt` int(12) NOT NULL,
  `buttons_callback` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `buttons`
--

INSERT INTO `buttons` (`buttons_id`, `buttons_text`, `buttons_questions_alt`, `buttons_callback`) VALUES
(1, 'Да', 0, 1),
(2, 'Нет', 3, 2),
(3, '10-20 часов в неделю', 1, 3),
(4, '20-30 часов в неделю', 0, 4),
(5, 'Понедельник (до обеда)', 0, 5),
(6, 'Понедельник (после обеда)', 0, 6),
(7, 'Среда (до обеда)', 0, 7),
(8, 'Среда (после обеда)', 0, 8),
(9, 'Пятница (до обеда)', 0, 9),
(10, 'Пятница (после обеда)', 0, 10),
(11, 'Нет', 2, 11);

-- --------------------------------------------------------

--
-- Структура таблицы `questions`
--

CREATE TABLE `questions` (
  `questions_id` int(12) NOT NULL,
  `questions_text` mediumtext CHARACTER SET utf8mb4 NOT NULL,
  `questions_step` int(2) NOT NULL,
  `questions_buttons` varchar(2) NOT NULL,
  `questions_terms` int(2) NOT NULL DEFAULT 0,
  `breakpoint` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `questions`
--

INSERT INTO `questions` (`questions_id`, `questions_text`, `questions_step`, `questions_buttons`, `questions_terms`, `breakpoint`) VALUES
(1, 'Здравствуйте! Меня зовут Ольга Полежаева, я руководитель школы программирования \"Hello World\", занимаюсь руководством преподавателями, в том числе отбором. Рада знакомству🤝🏻Напишите, пожалуйста, ваше полное ФИО, город и какие языки программирования вы знаете, на каком уровне владеете английским. Прошу также направить сюда ссылку на ваше резюме в hh. \r\n(Одним сообщением)\r\nСпасибо👍\r\nhttps://youtu.be/vyMFtteD1JA', 1, '0', 0, 0),
(2, 'Оправьте, пожалуйста, нам свой номер телефона.', 2, '0', 0, 0),
(3, 'Здорово 👍\r\nПодскажите, сколько часов в неделю вы готовы будете уделять преподаванию при условии работы онлайн один на один по Скайпу, одно занятие с учеником 55 минут, возраст 8- 16 лет?', 3, '2', 1, 0),
(4, 'Хорошо.\r\nВремя работы школы с 9:00 до 21:00 по мск 7 дней в неделю.\r\nВ какой половине дня планируете преподавать с учётом минимальной загрузки 20-25 часов в неделю?\r\n(Распишите, пожалуйста, на каждый день, но финальное расписание выстроиться по окончанию отбора)', 4, '0', 0, 0),
(5, 'Отлично 🌞\r\nИ вот ещё вопрос. У нас ставка 250р на руки в час оплата раз в неделю, соответственно при загрузке 20-25 часов в неделю в среднем в месяц выходит 20-25 000 рублей в месяц, при загрузке 40 часов в неделю в среднем выходит 40-45 тысяч рублей в месяц, выплаты раз в неделю, работаем по договору самозанятости (для РФ), вас такие условия устроят?\r\n	', 5, '1', 1, 0),
(6, 'В нашей школе преподаватели начинают с ведения 4 направлений: \r\n1. Программирование для начинающих на базе Scratch; \r\n2. Сайты ( html, css, верстка, JavaScript); \r\n3. Python. \r\n4. Компьютерная грамотность. Чаще всего преподаватели становятся универсалами, постепенно изучив методички каждого направления. Вы готовы изучать и преподавать эти направления?', 6, '1', 1, 0),
(7, 'Работа в нашей школе организована следующим образом:\r\nУрок 1 на 1 по Скайпу с вашим видео и демонстрацией экрана учеником. Длительность 55 минут. Только практика, делаете игру или задачу. К каждому занятию у нас есть разработанная инструкция и методический материал. Когда вы будете готовить демо-урок для отбора, я вам вышлю видео того, как реально проходит урок и методический  материал. У нас есть чаты со всеми преподавателями, есть общение по задачам, про все обо всем, с администраторами и менеджерами. Курирую преподавателей я, так что всегда будет поддержка. \r\nВас это устраивает?', 7, '1', 1, 0),
(8, 'Когда Вы готовы приступить к работе?', 8, '0', 0, 0),
(9, 'Отбор преподавателей в нашу школу состоит из следующих шагов:\r\nI. Вы записываете видео на телефон длительностью до 5 минут и высылаете мне ссылку на видео с youtube.com\r\n1. Почему скретч хорошо подходит для изучения программирования начинающим; \r\n2. Что такое html;\r\n3. Что такое переменная, как это об\'яснить ребенку.\r\nII.Выдаю вам доступ к методическим материалам для подготовки к демо-уроку по одному из направлений. Назначаете время (потребуется час) для проведения демо-урока для меня. \r\nIII. Проводите полноценный часовой демо-урок по Скайп с видео. Я - в роли ученика, вы - в роли преподавателя. Я даю вам обратную связь.\r\nIV. По результатам демо-урока в течении суток принимается решение о дальнейшем сотрудничестве\r\nV. Согласовываем ваше расписание и начинаем сотрудничество.\r\nВесь процесс занимает от 2 дней до недели.\r\nГотовы приступить к первому пункту отбора?', 9, '1', 1, 0),
(10, 'Подскажите когда ожидать от Вас видео?', 10, '0', 0, 1),
(11, 'Отлично ожидаем видео.\r\n(Пожалуйста, скиньте ссылки одним сообщением)', 11, '0', 0, 0),
(12, 'Отлично.\r\nСсылка с методичкой для вводного урока по Scratch\r\nhttps://hwschool.bitrix24.ru/~Fw5hX\r\nпароль - hwschool\r\nПосмотрите запись урока \r\nhttps://hwschool.bitrix24.ru/~ZRgEU\r\n------------------------------------------------------ \r\nПароль тот же, что и для подготовки к вводному\r\n\r\n\r\nПодскажите когда бы Вам было удобно провести демо-урок?', 12, '3', 0, 2),
(13, 'Хорошо. Встречаемся в скайпе, отправьте, пожалуйста, Ваш логин скайпа.', 13, '0', 0, 0),
(14, 'Оправьте, пожалуйста, нам свою почту gmail.', 14, '0', 0, 3),
(15, 'Результаты отбора ожидайте в течении двух рабочих дней на почте gmail.', 15, '0', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `questions_alt`
--

CREATE TABLE `questions_alt` (
  `questions_alt_id` int(12) NOT NULL,
  `questions_alt_text` mediumtext CHARACTER SET utf8mb4 NOT NULL,
  `questions_alt_buttons` int(2) NOT NULL DEFAULT 0,
  `questions_alt_terms` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `questions_alt`
--

INSERT INTO `questions_alt` (`questions_alt_id`, `questions_alt_text`, `questions_alt_buttons`, `questions_alt_terms`) VALUES
(1, 'Маловато😔 \r\nУ нас минимальное требование к преподавателю от 20 часов в неделю.Возможно у Вас получиться выделить больше времени? ', 4, 1),
(2, 'Понимаю, тогда пишите, если ситуация изменится👍\r\nПолноценная ставка это 40 часов в неделю, такие преподаватели у нас тоже есть. \r\nБыла рада общению🤝', 0, 0),
(3, 'Понимаю, тогда пишите, если ситуация изменится👍', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `question_buttons`
--

CREATE TABLE `question_buttons` (
  `question_buttons_id` int(11) NOT NULL,
  `question_buttons_texts` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `question_buttons`
--

INSERT INTO `question_buttons` (`question_buttons_id`, `question_buttons_texts`) VALUES
(1, '1,2'),
(2, '3,4'),
(3, '5,6,7,8,9,10'),
(4, '4,2');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `users_id` int(12) NOT NULL,
  `users_teleg_id` int(12) NOT NULL,
  `users_first_name` varchar(255) NOT NULL,
  `users_last_name` varchar(255) NOT NULL,
  `users_login` varchar(255) NOT NULL,
  `users_current_step` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answers_id`);

--
-- Индексы таблицы `buttons`
--
ALTER TABLE `buttons`
  ADD PRIMARY KEY (`buttons_id`);

--
-- Индексы таблицы `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`questions_id`);

--
-- Индексы таблицы `questions_alt`
--
ALTER TABLE `questions_alt`
  ADD PRIMARY KEY (`questions_alt_id`);

--
-- Индексы таблицы `question_buttons`
--
ALTER TABLE `question_buttons`
  ADD PRIMARY KEY (`question_buttons_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `answers`
--
ALTER TABLE `answers`
  MODIFY `answers_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=368;

--
-- AUTO_INCREMENT для таблицы `buttons`
--
ALTER TABLE `buttons`
  MODIFY `buttons_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `questions`
--
ALTER TABLE `questions`
  MODIFY `questions_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `questions_alt`
--
ALTER TABLE `questions_alt`
  MODIFY `questions_alt_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `question_buttons`
--
ALTER TABLE `question_buttons`
  MODIFY `question_buttons_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `users_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
