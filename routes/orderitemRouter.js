const express = require('express');
const router = express.Router();
const Orderitem = require('../module/Orderitem');

router.route('/')
.get((req, res, next) =>{
    Orderitem.find(req.params.orderitemid)
    .then((orderitem) => {
        res.json(orderitem);
    }).catch(next);
})

.post((req, res, next) => {
          Orderitem.create(req.body)
              .then((orderitem) => {
                  res.status(201).json(orderitem);
              }).catch(next);
    })
  
    .delete((req, res, next) => {
        Orderitem.deleteMany()
        .then(reply => {
            res.json(reply);
        }).catch(next);
    })

router.route('/:orderitemid')
   .get((req, res, next) => {
       Orderitem.findById(req.params.orderitemid)
            .then(items => {
                 res.json(items);
            }).catch(next);
    })

    .delete((req, res, next) => {
        Orderitem.deleteOne({_id: req.params.orderitemid})
        .then(replay => {
            res.json(replay);
        }).catch(next);
    })
    .put((req, res, next) => {
        Orderitem.findByIdAndUpdate(req.params.orderitemid,{$set: req.body},{new: true})
        .then(upd => {
            res.json(upd);
    
        }).catch(next);
    })
    module.exports = router;



