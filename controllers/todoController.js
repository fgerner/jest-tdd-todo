const TodoModel = require('../models/todo');

exports.createTodo = (req, res, next) => {
    TodoModel.create(req.body);
    res.status(201);
};