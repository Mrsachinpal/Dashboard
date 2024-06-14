const express = require('express');
const students = require('../model/Students');
const router = express.Router();

router.get('/seats',async (req,res)=>{
    let listofStudent = await students.find({});
    console.log(listofStudent)
    res.render('./seats/allseat',{listofStudent})
})


module.exports = router  