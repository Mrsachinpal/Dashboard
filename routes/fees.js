const express = require('express');
const students = require('../model/Students');
const Fees = require('../model/fees');
const { islogin } = require('../middleware');
const router = express.Router();

router.get('/feestatus',islogin, async (req, res) => {
    try {
        let foundStudent = await students.find();       // bekaar mai hi likhi hai ye (IG)
        res.render('./fees/feestatus', { foundStudent }) 
    } catch (err) {
        console.log(err);
    }
})

router.post('/feestatusfound',islogin, async (req, res) => {
    try {
        let { id } = req.body
        let foundStudent = await students.findOne({ id: id }).populate('fees')
        res.render('./fees/feestatus', { foundStudent });
    } catch (err) {
        console.log(err)
    }
})

router.get('/feesupdate/:id',islogin, async (req, res) => {
    try {
        let { id } = req.params;
        let foundStudent = await students.findById(id).populate('fees');

        res.render('./fees/feesUpdateForm', { foundStudent });
    } catch (err) {
        console.log(err)
    }
})

router.patch('/feesupdate/:id',islogin, async (req, res) => {
    try {
        let { id } = req.params;

        let { month, mode } = req.body
        let updatefee = await Fees.findByIdAndUpdate(id, { $push: { month: month }, mode: mode }, { new: true });
        req.flash('error',"Payment is pending! ")
        res.redirect(`/feestatus`)
    } catch (err) {
        console.log(err)
    }
})


router.post('/autofeesupdate/:id',islogin, async (req, res) => {
    try {
        console.log("autofeesupdate route")
        let { id } = req.params;
        console.log(id)
        let autoFeeUpdate = await Fees.create({});
        console.log('Blank fees route: ', autoFeeUpdate)
        let foundStudent = await students.findByIdAndUpdate(id, { $push: { fees: autoFeeUpdate._id } });
        res.render('./fees/feesUpdateForm', { foundStudent });
    } catch (err) {
        console.log(err)
    }
})



module.exports = router  