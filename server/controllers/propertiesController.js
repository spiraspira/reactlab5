const fs = require('fs');
const path = require('path');

// GET controller for retrieving property data
const getProperties = (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'properties.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    const properties = JSON.parse(data);
    res.json(properties);
  });
};

// POST controller for creating a new property
const createProperty = (req, res) => {
  const newProperty = req.body;

  const filePath = path.join(__dirname, '..', 'data', 'properties.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    const properties = JSON.parse(data);

    if(newProperty == null) {
        console.log("Entity is null");

        return;
    }

    properties.push(newProperty);

    fs.writeFile(filePath, JSON.stringify(properties), 'utf8', err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

      res.json(newProperty);
    });
  });
};

// PUT controller for updating property data
const updateProperty = (req, res) => {
  const propertyId = req.params.id;
  const updatedProperty = req.body;

  const filePath = path.join(__dirname, '..', 'data', 'properties.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    const properties = JSON.parse(data);

    const property = properties.find(p => p.id == propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    Object.assign(property, updatedProperty);

    fs.writeFile(filePath, JSON.stringify(properties), 'utf8', err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

      res.json(updatedProperty);
    });
  });
};

// DELETE controller for deleting a property
const deleteProperty = (req, res) => {
  const propertyId = req.params.id;

  const filePath = path.join(__dirname, '..', 'data', 'properties.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    const properties = JSON.parse(data);

    const propertyIndex = properties.findIndex(p => p.id == propertyId);
    if (propertyIndex === -1) {
      return res.status(404).json({ error: 'Property not found' });
    }

    properties.splice(propertyIndex, 1);

    fs.writeFile(filePath, JSON.stringify(properties), 'utf8', err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

      res.json({ id: propertyId });
    });
  });
};

module.exports = {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty
};