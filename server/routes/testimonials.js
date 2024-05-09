const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// GET-маршрут для получения данных Testimonials
router.get('/', (req, res) => {
  // Путь к файлу с данными Testimonials
  const filePath = path.join(__dirname, '..', 'data', 'testimonials.json');

  // Чтение файла с данными Testimonials
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    // Преобразование данных в формат JSON и отправка клиенту
    const testimonials = JSON.parse(data);
    res.json(testimonials);
  });
});

module.exports = router;