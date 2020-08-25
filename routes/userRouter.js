const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../module/User');
const jwt = require('jsonwebtoken');

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
                        id: user.id,
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
                            token: `Bearer ${token}`
                        });
                    });
                    
        
                }).catch(next);
            }).catch(next);
        
        })
        
        module.exports = router;