const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const student = require('./model/student') //import srudent schema
var app = express();

//use bodyParser middleware
app.use(bodyParser.json());

var host = 3000;

//create connection to mongodb server
const url = 'mongodb://127.0.0.1:27017/studentDb'
const connect = mongoose.connect(url);
connect.then((db) => {
        console.log(" Successfully Connected to database..!!")
    })
    .catch((err) => {
        console.log(err);
    })


//API request for get put post and delete

//home page
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.end('This is a test Student-API')
})

//fetch the details of the all the students
app.get('/student', (req, res) => {
    student.find({})
        .then((students) => {
            res.json(students);
        }, (err) => {
            console.log(err)
        })
})

//add student details
app.post('/student', (req, res) => {
    student.create(req.body)
        .then((student) => {
            console.log("Student Added Successfully..")
            res.json(student);
        }, (err) => {
            console.log(err)
        })
})

//delete student with a particular  rollno
app.delete('/student/:rollno', (req, res) => {
    student.deleteOne({ "rollno": req.params.rollno })
        .then((student) => {
            res.end("student Deleted Successfully");
        }, (err) => {
            console.log(err)
        })
})

//update email of specific student using rollno
app.put('/student/:rollno', (req, res) => {
    student.findOneAndUpdate({ "rollno": req.params.rollno }, { $set: { "email": req.body.email } }, { new: true })

    .then((studen) => {
        console.log("student updated Successfully")
        res.json(studen);
    }, (err) => {
        console.log(err)
    })

})



//starting the server
app.listen(host, (req, res) => {
    console.log(`Server listening on port: ${host}`);
})