const { Message } = require('../models/models');
const jwt = require('jsonwebtoken');

// GET-контроллер для получения данных Messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
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
      const token = req.headers.authorization; // Get the token from the request headers
      if (typeof token === 'undefined') {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const decodedToken = jwt.verify(token, "a6bj7dkvh43kge"); // Verify and decode the token
  
      // Check if the token is valid and contains the necessary information
      if (!decodedToken || !decodedToken.isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const message = await Message.findByPk(messageId);
  
      if (!message) {
        return res.status(404).json({ error: 'Сообщение не найдено' });
      }
  
      // Allow only admin users to update the message
      if (!decodedToken.isAdmin) {
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      await message.update(updatedMessage);
      res.json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  };
  
  const deleteMessage = async (req, res) => {
    const messageId = req.params.id;
  
    try {
      const token = req.headers.authorization; // Get the token from the request headers
      if (typeof token === 'undefined') {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const decodedToken = jwt.verify(token, "a6bj7dkvh43kge"); // Verify and decode the token
  
      // Check if the token is valid and contains the necessary information
      if (!decodedToken || !decodedToken.isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const message = await Message.findByPk(messageId);
  
      if (!message) {
        return res.status(404).json({ error: 'Сообщение не найдено' });
      }
  
      // Allow only admin users to delete the message
      if (!decodedToken.isAdmin) {
        return res.status(403).json({ error: 'Forbidden' });
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