const Product = require('../models/Product');

exports.createProduct = async (data) => {
    return await Product.create(data);
};

exports.getAllProducts = async () => {
    return await Product.find();
};

exports.getProducts = async (id) => {
    return await Product.findById(id)
}

exports.updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteProduct= async (id) => {
    return await Product.findByIdAndDelete(id)
}