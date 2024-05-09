const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// GET-маршрут для получения данных Messages
router.get('/', (req, res) => {
  // Путь к файлу с данными Messages
  const filePath = path.join(__dirname, '..', 'data', 'messages.json');

  // Чтение файла с данными Messages
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    // Преобразование данных в формат JSON и отправка клиенту
    const messages = JSON.parse(data);
    res.json(messages);
  });
});

module.exports = router;