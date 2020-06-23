const TodoController = require('./todoController');

describe('TodoController.createTodo', () => {
    it('should have a create todo function', () => {
        expect(typeof TodoController.createTodo).toBe('function');
    });
})