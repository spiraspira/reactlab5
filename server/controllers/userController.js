const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

exports.loginUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ where: { login } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ isAdmin: user.isAdmin, userId: user.Id }, "a6bj7dkvh43kge");
    

    res.json({ token, isAdmin: user.isAdmin, userId: user.Id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
    const { userId, password } = req.body;
  
    try {
        const token = req.headers.authorization; // Get the token from the request headers
        if (typeof token === 'undefined') {
          return res.status(401).json({ error: 'Unauthorized' });
        }
  
        const decodedToken = jwt.verify(token, "a6bj7dkvh43kge"); // Verify and decode the token
    
        // Check if the token is valid and contains the necessary information
        if (!decodedToken || decodedToken.userId != userId) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

      // Find the user in the database
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(password, 10);
  
      // Update the user's password
      user.password = hashedNewPassword;
      await user.save();
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };