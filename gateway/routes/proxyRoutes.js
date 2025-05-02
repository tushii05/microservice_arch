const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxyRoutes(app) {
    app.get('/api/health', (req, res) => {
        res.send('API Gateway is healthy 🚀');
    });
    app.use('/api/users', createProxyMiddleware({
        target: process.env.USER_SERVICE,
        changeOrigin: true,
        pathRewrite: { '^/api/users': '/users' }
    }));

    app.use('/api/products', createProxyMiddleware({
        target: process.env.PRODUCT_SERVICE,
        changeOrigin: true,
        pathRewrite: { '^/api/products': '/products' }
    }));
};
