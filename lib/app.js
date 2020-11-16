const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./controllers/authController'));
app.use('/api/v1/prompts', require('./controllers/promptController'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
