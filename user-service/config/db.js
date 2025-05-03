const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async (customUri) => {
    const dbURI = customUri || (process.env.SINGLE_DB === 'true'
        ? process.env.SHARED_DB_URI
        : process.env.MONGO_URI);

    await mongoose.connect(dbURI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    console.log('Connected to DB:', dbURI);
};

module.exports = connectDB;
