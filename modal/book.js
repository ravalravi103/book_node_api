let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    Id: Number,
    title: String,
    image: String,
    category: String,
    price: Number
});

module.exports = mongoose.model(
    'Book', BookSchema, 'Books');