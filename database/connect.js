const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/todoDb', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {connect};