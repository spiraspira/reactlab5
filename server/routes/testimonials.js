const express = require('express');

const router = express.Router();

const testimonialsController = require('../controllers/testimonialsController');

// GET-маршрут для получения данных Testimonials
router.get('/', testimonialsController.getTestimonials);

// POST-маршрут для создания нового сообщения
router.post('/', testimonialsController.createTestimonial);

// PUT-маршрут для обновления данных сообщения
router.put('/:id', testimonialsController.updateTestimonial);

// DELETE-маршрут для удаления сообщения
router.delete('/:id', testimonialsController.deleteTestimonial);

module.exports = router;