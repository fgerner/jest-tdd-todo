const TodoController = require('./todoController');
const TodoModel = require('../models/todo');

TodoModel.create = jest.fn();

describe('TodoController.createTodo', () => {
    it('should have a createTodo function', () => {
        expect(typeof TodoController.createTodo).toBe('function');
    })
    it('should call todo create model',  () => {
        TodoController.createTodo()
        expect(TodoModel.create).toBeCalled();
    });
})