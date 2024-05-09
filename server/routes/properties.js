const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// GET-маршрут для получения данных Properties
router.get('/', (req, res) => {
  // Путь к файлу с данными Properties
  const filePath = path.join(__dirname, '..', 'data', 'properties.json');

  // Чтение файла с данными Properties
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    // Преобразование данных в формат JSON и отправка клиенту
    const properties = JSON.parse(data);
    res.json(properties);
  });
});

module.exports = router;