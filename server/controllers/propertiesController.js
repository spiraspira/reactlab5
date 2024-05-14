const { Property } = require('../models/models');

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