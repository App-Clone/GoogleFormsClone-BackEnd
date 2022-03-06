const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    _id: String,
    title: String,
    description: String,
    questions: [],
    type: String,
    required: Boolean,
});

module.exports = mongoose.model('Form', FormSchema, 'Form-Collection');