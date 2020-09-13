const express = require('express');
const router = express.Router();

const Review = require('../module/Review');

router.route('/')
.get((req, res, next) =>{
    Review.find(req.params.reviewid)
    .then((rev) => {
        res.json(rev);
    }).catch(next);
})

.post((req, res, next) => {
          Review.create(req.body)
              .then((rev) => {
                  res.status(201).json(rev);
              }).catch(next);
    })
  
    .delete((req, res, next) => {
        Review.deleteMany()
        .then(reply => {
            res.json(reply);
        }).catch(next);
    })

router.route('/:reviewid')
   .get((req, res, next) => {
       Review.findById(req.params.reviewid)
            .then(rev => {
                 res.json(rev);
            }).catch(next);
    })

    .delete((req, res, next) => {
        Review.deleteOne({_id: req.params.reviewid})
        .then(replay => {
            res.json(replay);
        }).catch(next);
    })
    .put((req, res, next) => {
        Review.findByIdAndUpdate(req.params.reviewid,{$set: req.body},{new: true})
        .then(updrev => {
            res.json(updrev);
    
        }).catch(next);
    })

    module.exports = router;
