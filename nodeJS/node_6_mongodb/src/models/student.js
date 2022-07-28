const {Schema, model} = require('mongoose');

// firstname, lastname, email, courses

const schema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

const Model = model('Student', schema);

module.exports = Model;