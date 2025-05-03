const express = require('express');
const productRoutes = require('./routes/products');

const app = express();
app.use(express.json());
app.use('/', productRoutes);

app.get('/health', (req, res) => {
    res.send('User Service is alive!');
});

module.exports = app;
