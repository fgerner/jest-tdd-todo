const TodoController = require('./todoController');
const TodoModel = require('../models/todo');
const httpMocks = require('node-mocks-http');
const newTodo = require('./mock-data/new-todo.json');

TodoModel.create = jest.fn();
let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe('TodoController.createTodo', () => {
    it('should have a createTodo function', () => {
        expect(typeof TodoController.createTodo).toBe('function');
    })
    it('should call todo create model', () => {
        req.body = newTodo;
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toHaveBeenCalledWith(newTodo);
    });
})