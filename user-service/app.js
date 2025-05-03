const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use('/', authRoutes);

app.get('/health', (req, res) => {
    res.send('User Service is alive!');
});

module.exports = app;
