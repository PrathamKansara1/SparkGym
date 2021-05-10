const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SignUp', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

// mongoose schema 
const SignUpSchema = new mongoose.Schema({
    Username: String,
    Phone: String,
    Password: String,
    Age: String,
    Gender: String,
    Address: String,
    City: String,
    Membership: String
});
const Signup = mongoose.model('Signup', SignUpSchema);


app.use(express.static('views'));
app.use(express.urlencoded());

app.get('/' , (req,res)=>{
    res.status(200).render('Index.html' );
})
app.get('/Aboutus' , (req,res)=>{
    res.status(200).render('AboutUs.html' );
})
app.get('/Login' , (req,res)=>{
    res.status(200).render('Login.html' );
})
app.get('/Signup' , (req,res)=>{
    res.status(200).render('SignUp.html' );
})
app.post('/Signup' , (req,res)=>{
    const myData = new Signup(req.body);
    myData.save().then(()=>{
        res.send("You Successfully Registered YourSelf")
    }).catch(()=>{
        res.status(400).send("Your form Can't be registered at this Moment")
    });
})

app.listen(port , ()=>{
    console.log(`App has been started successfully on port : ${port}`);
})