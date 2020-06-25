const request = require('supertest');
const app = require('../App');
const newTodo = require('../controllers/mock-data/new-todo.json');

const endpoint = "/todos/";


describe(endpoint, () => {
    it('POST' + endpoint, async () => {
        const response = await request(app)
            .post(endpoint)
            .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    })
})