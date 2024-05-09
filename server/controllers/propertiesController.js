const fs = require('fs');
const path = require('path');

// Функция для чтения файла с данными Properties
function readProperties(callback) {
  const filePath = path.join(__dirname, '..', 'data', 'properties.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    const properties = JSON.parse(data);
    callback(null, properties);
  });
}

// Обработчик GET-запроса для получения данных Properties
function getProperties(req, res) {
  readProperties((err, properties) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(properties);
  });
}

module.exports = {
  getProperties
};