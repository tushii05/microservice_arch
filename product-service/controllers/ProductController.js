const ProductService = require('../services/ProductService');

exports.createProduct = async (req, res) => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
