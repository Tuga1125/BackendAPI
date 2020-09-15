const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    
    foodname: {
        type: String,
        required: true
      },
  
    comment : {
        type: String,
        required: true
     }
     },
     {timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);