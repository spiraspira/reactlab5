const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.createUser = async (req, res) => {
    const { login, password } = req.body;
  
    try {
      // Хеширование пароля
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Создание пользователя в базе данных
      const user = await User.create({ login, password: hashedPassword });
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };