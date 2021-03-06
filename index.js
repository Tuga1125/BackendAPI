const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path= require('path');
require('dotenv').config();

const userRouter =  require('./routes/userRouter');
const fooditemRouter =  require('./routes/fooditemRouter');
const orderitemRouter = require('./routes/orderitemRouter');
const reviewRouter = require('./routes/reviewRouter');
const uploadRouter = require('./routes/upload');


const app= express();
app.use(morgan('tiny'));


mongoose.connect(process.env.DbURI,{
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
   .then(() => console.log('Connected to database server'))
   .catch((err) => console.log(err));

   app.use(cors('*'));
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));
   app.use(express.static(path.join(__dirname, 'public')));
   
   
   app.get('/', (req, res) => {
       res.send('Welcome to my app');
   });
   
   app.use('/api/upload', uploadRouter)
   app.use('/api/users', userRouter);
   app.use('/api/fooditem', fooditemRouter);
   app.use('/api/orderitem', orderitemRouter);
   app.use('/api/review', reviewRouter);
   
   app.use((req,res, next)=> {
       let err = new Error('not found');
       err.status = 404;
       next(err);
     
   })
   
   app.use((err, req, res, next)=>{
       console.log (err.stack);
       res.status(err.status || 500);
       res.json({
           status:'error',
           message: err.message
       })
   })
   


   app.listen(process.env.port, () => {
    console.log(`server is running at localhost:${process.env.port}`);
});