const express = require('express');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Food', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}) 
   .then(() => console.log('Connected to database server'))
   .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.send('Welcome to food delivery app');
});


app.listen(3000, () =>{
    console.log("Server is running at localhost:3000");
})