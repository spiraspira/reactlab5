const express = require('express');

const router = express.Router();

const propertiesController = require('../controllers/propertiesController');

// GET-маршрут для получения данных Properties
router.get('/', propertiesController.getProperties);

// POST-маршрут для создания нового сообщения
router.post('/', propertiesController.createProperty);

// PUT-маршрут для обновления данных сообщения
router.put('/:id', propertiesController.updateProperty);

// DELETE-маршрут для удаления сообщения
router.delete('/:id', propertiesController.deleteProperty);

module.exports = router;