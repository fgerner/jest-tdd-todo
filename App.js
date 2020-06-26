const express = require('express');
const todoRoutes = require('./routes/todo');
const mongoDb = require('./database/connect');
const app = express();

mongoDb.connect();

app.use(express.json());
app.use('/todos', todoRoutes)

app.use((err, req, res, next) => {
    res.status(500).json({message: err.message})
})

app.get('/', (req, res) => {
    res.json('hello');
});

module.exports = app;
