const fs = require('fs');
const path = require('path');

// Функция для чтения файла с данными Messages
function readMessages(callback) {
  const filePath = path.join(__dirname, '..', 'data', 'messages.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    const messages = JSON.parse(data);
    callback(null, messages);
  });
}

// Обработчик GET-запроса для получения данных Messages
function getMessages(req, res) {
  readMessages((err, messages) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(messages);
  });
}

module.exports = {
  getMessages
};