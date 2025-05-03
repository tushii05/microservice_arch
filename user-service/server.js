const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5001;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`User service running on ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server:', err);
    });
