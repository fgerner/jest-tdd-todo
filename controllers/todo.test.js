const TodoController = require('./todoController');
const TodoModel = require('../models/todo');
const httpMocks = require('node-mocks-http');
const newTodo = require('./mock-data/new-todo.json');
const allTodos = require('./mock-data/all-todos.json');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('TodoController.getTodoById', () => {
   it('should have a getTodoById function', () => {
       expect(typeof TodoController.getTodoById).toBe('function');
   });
    it('should call TodoModel.getTodoById with route parameter', async ()=> {
        req.params.todoId = '5ef48a1921acc82c2ff2dc0a';
        await TodoController.getTodoById(req, res, next);
        expect(TodoModel.findById).toBeCalledWith('5ef48a1921acc82c2ff2dc0a');
    });
});

describe('TodoController.getTodos', () => {
    it('should have a getTodo function', () => {
        expect(typeof TodoController.getTodos).toBe('function');
    });
    it('should call TodoModel.find({})', async () => {
        await TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({})
    });
    it('should return response code 200 all todos', async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });
    it('should handle errors', async () => {
        const errorMessage = {message: 'No todos where found'};
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await TodoController.getTodos(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('TodoController.createTodo', () => {
    beforeEach(() => {
        req.body = newTodo;
    })
    it('should have a createTodo function', () => {
        expect(typeof TodoController.createTodo).toBe('function');
    })
    it('should call todo create model', () => {
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toHaveBeenCalledWith(newTodo);
    });
    it('should return status code 201', async () => {
        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return json body in response', async () => {
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
    it('should handle errors', async () => {
        const errorMessage = { message: 'Done property missing'};
        const rejectedPromice = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromice);
        await TodoController.createTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
})