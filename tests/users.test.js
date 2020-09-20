const request = require('supertest');
const express = require('express');
require('dotenv').config();
const userRouter =  require('./routes/userRouter');

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);
// Setup
require('./setup');
describe('Test of User Route', () => {
    test('should be able to register a user', () => {
        return request(app).post('/api/users/register')
            .send({
                username: 'Hellooo',
                password: 'Hellooo',
                firstname: 'Hellooo',
                lastname: 'Hellooo'
            })
            .then((res) => {
                expect(res.statusCode).toBe(201);
            })
    })
    test('should not register user with short username', () => {
        return request(app).post('/api/users/register')
            .send({
                username: 'Hellooo',
                password: 'Hellooo'
            }).then((res) => {
                console.log(res.body);
                expect(res.statusCode).toBe(400);
                expect(res.body.message.firstname).toBe('First name is required');
            })
    })
    test('should be able to login', () => {
        return request(app).post('/api/users/login')
            .send({
                username: 'test123',
                password: 'test123'
            }).then((res) => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.body.token).not.toBe('undefined');
            })
    })
})