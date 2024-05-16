const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// Маршрут для создания пользователя
router.post('/', userController.createUser);

module.exports = router;