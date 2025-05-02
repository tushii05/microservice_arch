require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

const dbURI = process.env.SINGLE_DB === 'true'
    ? process.env.SHARED_DB_URI
    : process.env.MONGO_URI;

mongoose.connect(dbURI)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.error('Mongo error:', err));

app.use('/', authRoutes);

app.get('/health', (req, res) => {
    res.send('User Service is alive!');
});

app.listen(process.env.PORT, () =>
    console.log(`User service running on ${process.env.PORT}`)
);