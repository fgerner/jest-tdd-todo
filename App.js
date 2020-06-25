const express = require('express');
const todoRoutes = require('./routes/todo');
const mongoDb = require('./database/connect');
const app = express();

mongoDb.connect();

app.use(express.json());
app.use('/todos', todoRoutes)

app.get('/', (req, res) => {
    res.json('hello');
});

module.exports = app;
