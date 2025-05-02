require('dotenv').config();
const express = require('express');
const setupProxyRoutes = require('./routes/proxyRoutes');

const app = express();

setupProxyRoutes(app);

app.use((err, req, res, next) => {
    console.error('Gateway error:', err.message);
    res.status(500).json({ error: 'Internal Gateway Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ API Gateway running on port ${PORT}`);
});
