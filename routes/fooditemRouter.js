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
// .post((req, res, next) => {
//     let{foodname, quantity, price} = req.body;
//     Fooditem.create({foodname, quantity, price})
//     .then(fooditem => {
//         res.status(201).json(fooditem);
//     }).catch(next);
// })
.post((req, res, next) => {
          Fooditem.create(req.body)
              .then((fooditem) => {
                  res.status(201).json(fooditem);
              }).catch((err) => console.log(err));
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
    .put((req,res,next) => {
        Fooditem.findByIdAndUpdate(req.params.fooditemid,{$set: req.body},{new: true})
        .then(upd => {
            res.json(upd);
    
        }).catch(next);
    })
    module.exports = router;

//     router.route('/foodname')
//     .get((req, res, next) => {
//         task.findById(req.params,task_id)
//         .then(items => {
//             res.json(task.notes);
//         }).catch(next);
//     })
//     .post((req, res, next) => {
//         task.findById(req.params.task_id)
//         .then(task => {
//             task.notes.push(req.body);
//             task.save()
//             .then(updatedTask => {
//                res.json(updatedTask.notes);
//             }).catch(next);
//         })
//         .delete((req, res, next) => {
//             task.findById(req.params.task_id)
//             .then(task => {
//                 task.save()
//                 .then(updatedTask => {
//                     res.json(update.notes);
//                 }).catch(next);
//             }).catch(next);
//         })
//     })

// module.exports = router;

// //RESTFUL? = server ma bhayeko every resourceslai url lai user le different methods le access garna paauna parxa, implement, modify, manipulate garna paauna parxa.
// //1.get= kunai resource paaunu paryo bhane
// /*
// app.get('/tasks', (req, res) => {
//     task.find()
//         .then((tasks)=> {
//             res.json('tasks');
//         }).catch(err => console.log(err));
// });

// //2.post = to create a new resource 
// app.post('/tasks', (req, res) => {
//      task.create(req.body)
//          .then((task) => {
//              res.status(201).json(task);
//          }).catch((err) => console.log(err));
// });

// //3.delete = to delete that resource
// app.delete('/tasks', (req, res) => {
//     task.deleteMany()
//         .then((reply) => {
//              res.json(reply);
//         }).catch((err)=> console.log(err));
// });

// app.get('/tasks/:id', (req, res) => {
//     task.findById(req.params.id)
//          .then((task) => {
//               res.json(task);
//          }).catch((err) => console.log(err));
// });
 
// //4.put = to update the resource
// app.put('/tasks/:id', (req, res) => {
//     task.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
//          .then((task) => {
//              res.json(task);
//          }).catch((err) => console.log(err));
// });

// app.delete('/tasks/:id', (req, res) => {
//     task.findByIdAndDelete(req.params.id)
//          .then((reply) => {
//              res.json(reply);
//          }).catch((err) => console.log(err));
// });
// */

