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
    console.log(process.env.SECRET_KEY);
    const token = jwt.sign({ userId: user.id }, "a6bj7dkvh43kge");

    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};