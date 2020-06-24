const TodoModel = require('../models/todo');

exports.createTodo = () => {
    TodoModel.create();
};