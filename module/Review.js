const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    
    displayName: {
        type: String,
        required: true
      },
      restaurantName: {
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