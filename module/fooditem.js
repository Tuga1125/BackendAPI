const mongoose = require ('mongoose');

const fooditemSchema = new mongoose.Schema({

    foodname: {
        type: String,
        required: true 
    },
    
    description: {
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
    }
    },
    {timestamps: true
});

module.exports = mongoose.model('Fooditem', fooditemSchema);

