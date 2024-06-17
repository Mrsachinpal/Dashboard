const mongoose = require('mongoose');
const Fees = require('./fees');
const Admin=require('./Admin')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    seat: {
        type: String,
        required: true,
        unique: true
    },
    prepration_for: {
        type: String,
        required: true
    },
    uploadImage: {
        data: Buffer,
        contentType: String,
    },
    fees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fees'
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }  

});

let students = mongoose.model('students', studentSchema);
module.exports = students;
    