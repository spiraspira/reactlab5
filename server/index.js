const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение маршрутов
const messagesRouter = require('./routes/messages');
const testimonialsRouter = require('./routes/testimonials');
const propertiesRouter = require('./routes/properties');

// Использование маршрутов
app.use('/messages', messagesRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/properties', propertiesRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});