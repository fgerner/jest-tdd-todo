const TodoModel = require('../models/todo');

exports.createTodo = async (req, res, next) => {
    try {
        const createdModel = await TodoModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (err) {
        next(err);
    }
};
exports.getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find({});
        res.status(200).json(allTodos);
    } catch (err) {
        next(err);
    }
};
exports.getTodoById = async (req, res, next) => {
    try {
        const foundTodo = await TodoModel.findById(req.params.todoId);
        if (foundTodo) {
            res.status(200).json(foundTodo);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};
exports.updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.todoId, req.body, {
            new: true,
            useFindAndModefy: false
        });
        if (updatedTodo) {
            res.sendStatus(200).then(res.json(updatedTodo));
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};
exports.deleteTodo = async (req, res, next) => {
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(req.params.todoId);
        if (deletedTodo) {
            res.send(200).json(deletedTodo);
        } else {
            res.sendStatus(404).send();
        }
    } catch (err) {
        next(err);
    }
};
