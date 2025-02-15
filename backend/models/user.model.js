const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a username'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username must be at most 50 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    address: {
        type: String,
        required: [true, 'Please enter an address'],
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.role; // Exclude role from the response
            return ret;
        }
    }
},
);

const User = mongoose.model('User', userSchema);

module.exports = User;