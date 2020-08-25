const express = require('express');
const router = express.Router();
const task = require('../module/fooditem');
const { update } = require('../module/fooditem');

router.route('/')
      .get((req,res, next) => {
          task.find()
              .then((task) => {
                  res.json(task);
              });
      })
      .post((req, res, next) => {
          task.create(req.body)
              .then(task => {
                  res.status(201).json(task)
              }).catch(next);
        })
      .delete((req, res, next) => {
          task.deleteMany()
              .then(reply => {
                  res.json(reply);
              }).catch(next);

      })

router.route('/:fooditem_id')
   .get((req, res, next) => {
       task.findById(req.params.task_id)
            .then(task => {
                 res.json(task);
            }).catch(next);
    })
    .put((req, res, next) => {
        task.findByIdAndUpdate(req.params.task_id, {$set: req.body}, {new: true})
        .then(task => {
             res.json(task);
        }).catch(next);
    })
    .delete((req, res, next) => {
        task.deleteOne({_id: req.params.task_id})
        .then(replay => {
            res.json(replay);
        }).catch(next);
    })


    router.route('/:task_id/notes')
    .get((req, res, next) => {
        task.findById(req.params,task_id)
        .then(task => {
            res.json(task.notes);
        }).catch(next);
    })
    .post((req, res, next) => {
        task.findById(req.params.task_id)
        .then(task => {
            task.notes.push(req.body);
            task.save()
            .then(updatedTask => {
               res.json(updatedTask.notes);
            }).catch(next);
        })
        .delete((req, res, next) => {
            task.findById(req.params.task_id)
            .then(task => {
                task.save()
                .then(updatedTask => {
                    res.json(update.notes);
                }).catch(next);
            }).catch(next);
        })
    })

module.exports = router;

//RESTFUL? = server ma bhayeko every resourceslai url lai user le different methods le access garna paauna parxa, implement, modify, manipulate garna paauna parxa.
//1.get= kunai resource paaunu paryo bhane
/*
app.get('/tasks', (req, res) => {
    task.find()
        .then((tasks)=> {
            res.json('tasks');
        }).catch(err => console.log(err));
});

//2.post = to create a new resource 
app.post('/tasks', (req, res) => {
     task.create(req.body)
         .then((task) => {
             res.status(201).json(task);
         }).catch((err) => console.log(err));
});

//3.delete = to delete that resource
app.delete('/tasks', (req, res) => {
    task.deleteMany()
        .then((reply) => {
             res.json(reply);
        }).catch((err)=> console.log(err));
});

app.get('/tasks/:id', (req, res) => {
    task.findById(req.params.id)
         .then((task) => {
              res.json(task);
         }).catch((err) => console.log(err));
});
 
//4.put = to update the resource
app.put('/tasks/:id', (req, res) => {
    task.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
         .then((task) => {
             res.json(task);
         }).catch((err) => console.log(err));
});

app.delete('/tasks/:id', (req, res) => {
    task.findByIdAndDelete(req.params.id)
         .then((reply) => {
             res.json(reply);
         }).catch((err) => console.log(err));
});
*/

