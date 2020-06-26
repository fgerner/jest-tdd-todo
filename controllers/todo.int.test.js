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
    });
    it('should return error 500 on malformed data with POST' + endpoint, async () => {
        const response = await request(app)
            .post(endpoint)
            .send({title: "missing done property"});
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({message: 'Todo validation failed: done: Path `done` is required.'})
    })
})