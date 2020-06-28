const TodoController = require('./todoController');
const TodoModel = require('../models/todo');
const httpMocks = require('node-mocks-http');
const newTodo = require('./mock-data/new-todo.json');
const allTodos = require('./mock-data/all-todos.json');

// TodoModel.create = jest.fn();
// TodoModel.find = jest.fn();
// TodoModel.findById = jest.fn();
// TodoModel.findByIdAndUpdate = jest.fn();
jest.mock('../models/todo');


let req, res, next;
const todoId = '5ef48a1921acc82c2ff2dc0a';

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('TodoController.deleteTodo', () => {
    it('should have a deleteTodo function', () => {
        expect(typeof TodoController.deleteTodo).toBe('function');
    });
    it('should delete todo with TodoModel.deleteOne', async () => {
        req.params.todoId = todoId;
        await TodoController.deleteTodo(req, res, next);
        expect(TodoModel.findByIdAndDelete).toHaveBeenCalledWith(todoId);
    });
    it('should return status code 200 and deleted todoModel', async () => {
        TodoModel.findByIdAndDelete.mockReturnValue(newTodo);
        await TodoController.deleteTodo(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should handle errors', async () => {
        const errorMessage = {message: 'error deleting'};
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await TodoController.deleteTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it('should return 404 if todo not found', async () => {
        TodoModel.findByIdAndDelete.mockReturnValue(null);
        await TodoController.deleteTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
})

describe('TodoController.updateTodo', () => {
    it('should have a updateTodo function', () => {
        expect(typeof TodoController.updateTodo).toBe('function');
    });
    it('should update with TodoModel.findByIdAndUpdate', async () => {
        req.params.todoId = todoId;
        req.body = newTodo;
        await TodoController.updateTodo(req, res, next);
        expect(TodoModel.findByIdAndUpdate).toBeCalledWith(todoId, newTodo, {new: true, useFindAndModefy: false});
    });
    it('should return with a json body and status code 200', async () => {
        req.params.todoId = todoId;
        req.body = newTodo;
        TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
        await TodoController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(req.body).toStrictEqual(newTodo);
    });
    it('should handle errors', async () => {
        const errorMessage = 'Error updating';
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await TodoController.updateTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
    it('should return 404 if todo not found', async () => {
        TodoModel.findByIdAndUpdate.mockReturnValue(null);
        await TodoController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    })

})

describe('TodoController.getTodoById', () => {
    it('should have a getTodoById function', () => {
        expect(typeof TodoController.getTodoById).toBe('function');
    });
    it('should call TodoModel.getTodoById with route parameter', async () => {
        req.params.todoId = todoId;
        await TodoController.getTodoById(req, res, next);
        expect(TodoModel.findById).toBeCalledWith(todoId);
    });
    it('should return Json body and response code 200', async () => {
        TodoModel.findById.mockReturnValue(newTodo)
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
    it('should handle errors', async () => {
        const errorMessage = {message: 'Error finding'};
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findById.mockReturnValue(rejectedPromise);
        await TodoController.getTodoById(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
    it('should return 404 when item not found', async () => {
        TodoModel.findById.mockReturnValue(null);
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
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
        const errorMessage = {message: 'Done property missing'};
        const rejectedPromice = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromice);
        await TodoController.createTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
})