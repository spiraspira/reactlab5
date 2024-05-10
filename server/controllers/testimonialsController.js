const fs = require('fs');
const path = require('path');

// GET controller for retrieving testimonial data
const getTestimonials = (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'testimonials.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    const testimonials = JSON.parse(data);
    res.json(testimonials);
  });
};

// POST controller for creating a new testimonial
const createTestimonial = (req, res) => {
  const newTestimonial = req.body;
    if(newTestimonial == null) {
        console.log("Entity is null");

        return;
    }

  const filePath = path.join(__dirname, '..', 'data', 'testimonials.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    const testimonials = JSON.parse(data);

    testimonials.push(newTestimonial);

    fs.writeFile(filePath, JSON.stringify(testimonials), 'utf8', err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

      res.json(newTestimonial);
    });
  });
};

// PUT controller for updating testimonial data
const updateTestimonial = (req, res) => {
  const testimonialId = req.params.id;
  const updatedTestimonial = req.body;

  const filePath = path.join(__dirname, '..', 'data', 'testimonials.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    const testimonials = JSON.parse(data);

    const testimonial = testimonials.find(t => t.id == testimonialId);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    Object.assign(testimonial, updatedTestimonial);

    fs.writeFile(filePath, JSON.stringify(testimonials), 'utf8', err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

      res.json(updatedTestimonial);
    });
  });
};

// DELETE controller for deleting a testimonial
const deleteTestimonial = (req, res) => {
  const testimonialId = req.params.id;

  const filePath = path.join(__dirname, '..', 'data', 'testimonials.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    const testimonials = JSON.parse(data);

    const testimonialIndex = testimonials.findIndex(t => t.id == testimonialId);
    if (testimonialIndex === -1) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    testimonials.splice(testimonialIndex, 1);

    fs.writeFile(filePath, JSON.stringify(testimonials), 'utf8', err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

      res.json({id: testimonialId});
    });
  });
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};