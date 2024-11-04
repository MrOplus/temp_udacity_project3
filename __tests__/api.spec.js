const app = require('../src/backend/app');
const request = require('supertest');
describe('Test the root path', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .get('/');
        expect(res.statusCode).toEqual(200)
    });
});