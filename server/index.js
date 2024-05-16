const express = require("express");
const sequelize = require("./models/index");
const models = require('./models/models')
const cors = require("cors");

const PORT = 5000;

const app = express();
app.use(cors())
app.use(express.json())

// Подключение маршрутов
const messagesRouter = require('./routes/messages');
const testimonialsRouter = require('./routes/testimonials');
const propertiesRouter = require('./routes/properties');
const usersRouter = require('./routes/users');

// Использование маршрутов
app.use('/messages', messagesRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/properties', propertiesRouter);
app.use('/users', usersRouter);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
};

start();