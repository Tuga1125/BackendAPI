const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        minlength:4
    },
    email:{
       type: String,
       required: true
    },
    password:{
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user','admin']
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)