const mongoose = require ('mongoose');
const dateFormat = require('dateformat');


const orderitemSchema = new mongoose.Schema({

    fooditemid:
    [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Fooditem'
        
    }],

    userid:
    [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        
    }],
    
    quantity:{
        type: String,
        required: true
    },

    price:{
        type: String,
        required: true
    },
    
    date:{
        type:Date,
        default: dateFormat(new Date(), "ddd mmm dd yyyy HH:MM:ss")
    }
    },
    {timestamps: true
});

module.exports = mongoose.model('Orderitem', orderitemSchema);

