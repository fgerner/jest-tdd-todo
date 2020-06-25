const TodoModel = require('../models/todo');

exports.createTodo = async (req, res, next) => {
    const createdModel = await TodoModel.create(req.body);
    res.status(201).json(createdModel);
};