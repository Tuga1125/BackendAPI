const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../module/User');
const jwt = require('jsonwebtoken');
const auth = require('../routes/auth');

const validation = require('../validation');

const router = express.Router();


router.post('/register', (req, res, next) => {
   const {errors, isValid} = validation.registerInput(req.body);
    if(!isValid){
        res.status(400).json({
            status: 'error',
            message:errors
        });
    }
        let {username, email, password, firstname, lastname, role} = req.body;
        User.findOne({username})
        .then((user) => {
            if (user){
                let err = new Error('User already exists!');
                err.status = (401);
                return next(err);
            }
            bcrypt.hash(password, 8 , (err, hashed) => {
                if(err) next(err);
                    User.create({username, password: hashed, email, firstname, lastname, role})
                    .then((user) => {
                        res.json({status: 'Registered Successfully!'});
                    }).catch(next);
                })
            }).catch(next);
        })

        router.post('/login', (req, res, next) => {
            let { username, password} = req.body;
            User.findOne({username})
            .then((user) => {
                if (!user) {
                    let err = new Error('User not found ');
                    err.status = 401;
                    return next(err);
                }
                bcrypt.compare(password, user.password)
                .then((isMatched) => {
                    if(!isMatched){
                        let err = new Error('password does not match');
                        err.status = 401;
                        return next(err);
                    }
                    let payload = {
                        userid: user.userid,
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        role: user.role
        
                    }
                    jwt.sign(payload, process.env.SECRET, (err,token)=> {
                        if(err){
                            return next(err);
                        }
                        res.json({
                            status: 'Login Sucessful',
                            //  _id:user._id,
                            token: `Bearer ${token}`
                        });
                    });
                    
        
                }).catch(next);
            }).catch(next);
        
        })

        // router.put('/update/:userid', Auth.verifyUser, (req, res, next) => {
        //     User.findByIdAndUpdate(req.userid, { $set: req.body }, { new: true })
        //         .then((user) => {
        //             res.json({ _id: user._id, username: user.username, email: user.email, password:user.password,  firstname: req.user.firstname, lastname: req.user.lastname});
        //         }).catch(next);
        // });
        router.put("/:userid", update);
        function update(req, res, next) {
            userService
              .update(req.params.userid, req.body)
              .then(() => res.json({}))
              .catch(err => next(err));
          }
          
        // router.put('/update/:userid', function(req, res){
        //     users.findOneAndUpdate({_id :req.params.userid}, req.body).then(function(){
        //         res.send("Account updated!")
        //     }).catch(function(){ 
        //         res.send("error")
        //     }) 
        //     })
    

        router.delete('/delete/:userid', function(req, res){
            console.log(req.params.userid);
            users.findByIdAndDelete(req.params.userid).then(function(){
                res.send("User has been deleted.")
            }).catch(function(){ 
                res.send(e)
            })
            })

        // router.put('/update/:userid', (req, res, next) => {
        //     userid.findByIdAndUpdate(req.params.userid,{$set: req.body},{new: true})
        //     .then(upd => {
        //         res.json(upd);
        
        //     }).catch(next);
        // })
        module.exports = router;