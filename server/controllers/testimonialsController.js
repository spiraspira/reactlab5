const fs = require('fs');
const path = require('path');

// Функция для чтения файла с данными Testimonials
function readTestimonials(callback) {
  const filePath = path.join(__dirname, '..', 'data', 'testimonials.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    const testimonials = JSON.parse(data);
    callback(null, testimonials);
  });
}

// Обработчик GET-запроса для получения данных Testimonials
function getTestimonials(req, res) {
  readTestimonials((err, testimonials) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(testimonials);
  });
}

module.exports = {
  getTestimonials
};