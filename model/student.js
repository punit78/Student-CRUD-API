const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: { firstname: String, lastname: String },
    rollno: Number,
    age: Number,
    branch: String,
    phone: Number,
    address: String,
    email: String

}, { timestamps: true })

var student = mongoose.model('student', studentSchema)

module.exports = student;