const express = require('express');
const router = express.Router();
//const { update } = require('../module/fooditem');
const Fooditem = require('../module/Fooditem');

router.route('/')
.get((req, res, next) =>{
    Fooditem.find(req.params.fooditemid)
    .then((fooditem) => {
        res.json(fooditem);
    }).catch(next);
})

.post((req, res, next) => {
          Fooditem.create(req.body)
              .then((fooditem) => {
                  res.status(201).json(fooditem);
              }).catch(next);
    })
  
    .delete((req, res, next) => {
        Fooditem.deleteMany()
        .then(reply => {
            res.json(reply);
        }).catch(next);
    })

router.route('/:fooditemid')
   .get((req, res, next) => {
       Fooditem.findById(req.params.fooditemid)
            .then(items => {
                 res.json(items);
            }).catch(next);
    })

    .delete((req, res, next) => {
        Fooditem.deleteOne({_id: req.params.fooditemid})
        .then(replay => {
            res.json(replay);
        }).catch(next);
    })
    .put((req, res, next) => {
        Fooditem.findByIdAndUpdate(req.params.fooditemid,{$set: req.body},{new: true})
        .then(upd => {
            res.json(upd);
    
        }).catch(next);
    })
    module.exports = router;


