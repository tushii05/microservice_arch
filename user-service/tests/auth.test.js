const request = require('supertest');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const app = require('../app');

let userId;

beforeAll(async () => {
    await connectDB('mongodb://127.0.0.1:27017/users-test');
});


afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('User Registration', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('email', 'test@example.com');

        userId = res.body._id;
    });

    it('should not allow duplicate email', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                name: 'Test User 2',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    it('should get all users', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get user by ID', async () => {
        const res = await request(app).get(`/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', userId);
    });

    it('should return 400 if user not found', async () => {
        const res = await request(app).get('/645f1a48123456789abc1234');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'User Not Found');
    });

    it('should delete user by ID', async () => {
        const res = await request(app).delete(`/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', userId);
    });

    it('should return 400 when deleting a non-existent user', async () => {
        const res = await request(app).delete('/645f1a48123456789abc1234');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'User Not Found');
    });
});
