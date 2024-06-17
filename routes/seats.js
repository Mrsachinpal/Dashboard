const express = require('express');
const students = require('../model/Students');
const { islogin } = require('../middleware');
const router = express.Router();

router.get('/seats',islogin,async (req,res)=>{
    let listofStudent = await students.find({});
    console.log(listofStudent)
    res.render('./seats/allseat',{listofStudent})
})


module.exports = router  