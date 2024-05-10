const express = require('express');

const router = express.Router();

const messagesController = require('../controllers/messagesController');

// GET-маршрут для получения данных Messages
router.get('/', messagesController.getMessages);

// POST-маршрут для создания нового сообщения
router.post('/', messagesController.createMessage);

// PUT-маршрут для обновления данных сообщения
router.put('/:id', messagesController.updateMessage);

// DELETE-маршрут для удаления сообщения
router.delete('/:id', messagesController.deleteMessage);

module.exports = router;