const { Testimonial } = require('../models/models');
const jwt = require('jsonwebtoken');

// GET controller for retrieving testimonial data
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST controller for creating a new testimonial
const createTestimonial = async (req, res) => {
  try {
    const { name, testimonial } = req.body;
    const newTestimonial = await Testimonial.create({
      name,
      testimonial,
      date: new Date()
    });
    res.json(newTestimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT controller for updating testimonial data
const updateTestimonial = async (req, res) => {
  const testimonialId = req.params.id;
  const updatedTestimonial = req.body;

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
    const testimonial = await Testimonial.findByPk(testimonialId);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    await testimonial.update(updatedTestimonial);
    res.json(updatedTestimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE controller for deleting a testimonial
const deleteTestimonial = async (req, res) => {
  const testimonialId = req.params.id;

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
    const testimonial = await Testimonial.findByPk(testimonialId);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    await testimonial.destroy();
    res.json({ Id: testimonialId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};