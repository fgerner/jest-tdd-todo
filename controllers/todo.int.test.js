const request = require('supertest');
const app = require('../App');
const newTodo = require('../controllers/mock-data/new-todo.json');

const endpoint = "/todos/";
let firstTodo, newTodoId;

describe(endpoint, () => {
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        firstTodo = response.body[0];
    });
    it("GET by id " + endpoint, async () => {
        const response = await request(app).get(endpoint + firstTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);
    });
    it('GET when id dosen\'t exist ', async () => {
        const response = await request(app).get(endpoint + '5ef48aa92cee9f2c69f3128d');
        expect(response.statusCode).toBe(404);
    })
    it('POST ' + endpoint, async () => {
        const response = await request(app)
            .post(endpoint)
            .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        newTodoId = response.body._id;
    });
    it('should return error 500 on malformed data with POST' + endpoint, async () => {
        const response = await request(app)
            .post(endpoint)
            .send({title: "missing done property"});
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({message: 'Todo validation failed: done: Path `done` is required.'})
    });
    it('PUT ' + endpoint, async () => {
        const testData = {title: 'test data PUT', done: true};
        const res = await request(app)
            .put(endpoint + newTodoId)
            .send(testData);
        expect(res.statusCode).toBe(200);
    });
    it('DELETE ' + endpoint, async () => {
        const response = await request(app).delete(endpoint + newTodoId);
        expect(response.statusCode).toBe(200);
    })
})