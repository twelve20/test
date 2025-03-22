const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

// Инициализация приложения Express
const app = express();
const PORT = process.env.PORT || 3000;

// Конфигурация промежуточного ПО
app.use(bodyParser.json());
app.use(cors()); // Разрешаем CORS для запросов с любых доменов
app.use(express.static('.')); // Обслуживаем статические файлы из текущей директории

// Конфигурация Telegram
const BOT_TOKEN = process.env.BOT_TOKEN || '';
const CHAT_ID = process.env.CHAT_ID || '';

// Маршрут для обработки сообщений
app.post('/send-to-telegram', async (req, res) => {
    try {
        // Проверяем, что токен и chat ID заданы
        if (!BOT_TOKEN || !CHAT_ID) {
            return res.status(500).json({
                success: false,
                message: 'Ошибка настройки: Токен бота или Chat ID не заданы'
            });
        }

        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Сообщение не предоставлено'
            });
        }

        // URL для отправки сообщения через Telegram API
        const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        // Параметры запроса
        const telegramData = {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        };
        
        // Отправка запроса в Telegram
        const telegramResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(telegramData)
        });
        
        const responseData = await telegramResponse.json();
        
        if (responseData.ok) {
            return res.json({
                success: true,
                message: 'Сообщение успешно отправлено'
            });
        } else {
            console.error('Ошибка Telegram API:', responseData);
            return res.status(500).json({
                success: false,
                message: 'Ошибка при отправке сообщения в Telegram',
                error: responseData
            });
        }
    } catch (error) {
        console.error('Ошибка сервера:', error);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка на сервере',
            error: error.message
        });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
}); 