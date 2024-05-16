const bcrypt = require('bcrypt');
const { User } = require('../models/models');

exports.createUser = async (req, res) => {
    const { login, password } = req.body;
  
    try {
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Creating the user in the database
      const user = await User.create({ login, password: hashedPassword });
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };