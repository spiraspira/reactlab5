const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// Маршрут для создания пользователя
router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.post('/login', userController.loginUser);

module.exports = router;