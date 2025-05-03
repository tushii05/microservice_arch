const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const connectDB = require('../config/db');
const Product = require('../models/Product');

beforeAll(async () => {
    await connectDB('mongodb://127.0.0.1:27017/products-test');
});

afterEach(async () => {
    await Product.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Product API', () => {
    it('should create a new product', async () => {
        const res = await request(app)
            .post('/')
            .send({
                name: 'Test Product',
                price: 99.99,
                description: 'A test product',
                quantity: 100
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Test Product');
    });

    it('should get all products', async () => {
        await Product.create({
            name: 'Another Product',
            price: 49.99,
            description: 'Sample description',
            quantity: 100
        });

        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe('Another Product');
    });

    it('should get a product by ID', async () => {
        const createdProduct = await Product.create({
            name: 'Product By ID',
            price: 29.99,
            description: 'Fetch by ID',
            quantity: 50
        });

        const res = await request(app).get(`/${createdProduct._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', createdProduct._id.toString());
        expect(res.body.name).toBe('Product By ID');
    });

    it('should update a product', async () => {
        const product = await Product.create({
            name: 'Old Product',
            price: 10.0,
            description: 'Old desc',
            quantity: 5
        });

        const res = await request(app)
            .patch(`/${product._id}`)
            .send({ name: 'Updated Product', price: 15.0 });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Updated Product');
        expect(res.body.price).toBe(15.0);
    });

    it('should delete a product', async () => {
        const product = await Product.create({
            name: 'Delete Me',
            price: 20.0,
            description: 'To be deleted',
            quantity: 10
        });

        const res = await request(app).delete(`/${product._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Product deleted successfully');

        // Confirm it no longer exists
        const found = await Product.findById(product._id);
        expect(found).toBeNull();
    });
});
