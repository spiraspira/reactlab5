const fs = require('fs');
const path = require('path');

// GET-контроллер для получения данных Messages
const getMessages = (req, res) => {
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
};

// POST-контроллер для создания нового сообщения
const createMessage = (req, res) => {
  const newMessage = req.body; // Данные для создания нового сообщения

  // Чтение файла с данными Messages
  const filePath = path.join(__dirname, '..', 'data', 'messages.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    // Преобразование данных в формат JSON
    const messages = JSON.parse(data);

    if(newMessage == null) {
        console.log("Entity is null");

        return;
    }

    // Добавление нового сообщения
    messages.push(newMessage);

    // Запись обновленных данных в файл
    fs.writeFile(filePath, JSON.stringify(messages), 'utf8', err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка сервера' });
      }

      res.json(newMessage);
    });
  });
};

// PUT-контроллер для обновления данных сообщения
const updateMessage = (req, res) => {
  const messageId = req.params.id;
  const updatedMessage = req.body; // Данные для обновления сообщения

  // Путь к файлу с данными Messages
  const filePath = path.join(__dirname, '..', 'data', 'messages.json');

  // Чтение файла с данными Messages
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    // Преобразование данных в формат JSON
    const messages = JSON.parse(data);

    // Поиск сообщения по идентификатору
    const message = messages.find(m => m.id == messageId);
    if (!message) {
      return res.status(404).json({ error: 'Сообщение не найдено' });
    }

    // Обновление данных сообщения
    message.text = updatedMessage.text;

    // Запись обновленных данных в файл
    fs.writeFile(filePath, JSON.stringify(messages), 'utf8', err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка сервера' });
      }

      res.json(updatedMessage);
    });
  });
};

// DELETE-контроллер для удаления сообщения
const deleteMessage = (req, res) => {
  const messageId = req.params.id;

  // Путь к файлу с данными Messages
  const filePath = path.join(__dirname, '..', 'data', 'messages.json');

  // Чтение файла с данными Messages
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    // Преобразование данных в формат JSON
    const messages = JSON.parse(data);

    // Поиск сообщения по идентификатору
    const messageIndex = messages.findIndex(m => m.id == messageId);
    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Сообщение не найдено' });
    }

    // Удаление сообщения из массива
    messages.splice(messageIndex, 1);

    // Запись обновленных данных в файл
    fs.writeFile(filePath, JSON.stringify(messages), 'utf8', err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка сервера' });
      }

      res.json({ id: messageId });
    });
  });
};

module.exports = {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage
};