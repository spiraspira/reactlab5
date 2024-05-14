const { Message } = require('../models/models');

// GET-контроллер для получения данных Messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// POST-контроллер для создания нового сообщения
const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = await Message.create({
      name,
      email,
      message,
      date: new Date()
    });
    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// PUT-контроллер для обновления данных сообщения
const updateMessage = async (req, res) => {
  const messageId = req.params.id;
  const updatedMessage = req.body;

  try {
    const message = await Message.findByPk(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Сообщение не найдено' });
    }

    await message.update(updatedMessage);
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// DELETE-контроллер для удаления сообщения
const deleteMessage = async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await Message.findByPk(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Сообщение не найдено' });
    }

    await message.destroy();
    res.json({ Id: messageId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

module.exports = {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage
};