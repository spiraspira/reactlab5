const { Property } = require('../models/models');
const jwt = require('jsonwebtoken');

// GET controller for retrieving property data
const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST controller for creating a new property
const createProperty = async (req, res) => {
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

    const { name, description } = req.body;
    const newProperty = await Property.create({
      name,
      description
    });
    res.json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT controller for updating property data
const updateProperty = async (req, res) => {
  const propertyId = req.params.id;
  const updatedProperty = req.body;

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

    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    await property.update(updatedProperty);
    res.json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE controller for deleting a property
const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;

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

    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    await property.destroy();
    res.json({ Id: propertyId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty
};