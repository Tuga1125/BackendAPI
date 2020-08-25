const mongoose = require ('mongoose');

const fooditemSchema = new mongoose.Schema({
    fooditemid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    foodname: {
        type: String,
        required: true 
    },

    quantity:{
        type: String,
        required: true
    },

    price:{
        type: String,
        required: true
    },
    timestamps: true
});

module.exports = mongoose.model('fooditem', fooditemSchema);

