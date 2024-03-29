const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user_management_system');

const express = require('express');
const app = express();

const nocache = require('nocache');

app.use(nocache());

//for use route
const userRoute = require('./routes/userRoute');
app.use('/',userRoute);


//for admin route
const adminRoute = require('./routes/adminRoute');
app.use('/admin',adminRoute);


app.listen(3000,()=>{
    console.log("http://localhost:3000");
});