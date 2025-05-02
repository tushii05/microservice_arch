const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/users-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('User Registration', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    it('should not allow duplicate email', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                name: 'Test User 2',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
