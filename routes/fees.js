const express = require('express');
const students = require('../model/Students');
const Fees = require('../model/fees');
const router = express.Router();

router.get('/feestatus', async (req, res) => {
    try {
        let foundStudent = await students.find();
        console.log(foundStudent)
        res.render('./fees/feestatus', { foundStudent })
    } catch (err) {
        console.log(err);
    }
})

router.post('/feestatusfound', async (req, res) => {
    try {
        let { id } = req.body
        let foundStudent = await students.findOne({ id: id }).populate('fees')
        res.render('./fees/feestatus', { foundStudent });
    } catch (err) {
        console.log(err)
    }
})

router.get('/feesupdate/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let foundStudent = await students.findById(id).populate('fees');
        console.log(foundStudent);
        res.render('./fees/feesUpdateForm', { foundStudent });
    } catch (err) {
        console.log(err)
    }
})

router.patch('/feesupdate/:id', async (req, res) => {
    try {
        let { id } = req.params;
        console.log(id)
        let { month, mode } = req.body
        let updatefee = await Fees.findByIdAndUpdate(id, { $push: { month: month }, mode: mode }, { new: true });
        console.log(updatefee);
        res.redirect(`/feesupdate/${id}`)
    } catch (err) {
        console.log(err)
    }
})


router.post('/autofeesupdate/:id', async (req, res) => {
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
























// router.get('/feesupdate/:id', async (req, res) => {
//     let { id } = req.params
//     let foundStudent = await students.findById(id);
//     console.log(foundStudent.name);
//     // const value = req.query.value;
//     const value = JSON.parse(req.query.value || '{}');
//     console.log(`Value: ${value._id}`);
//     res.render('./fees/feeupdateform', { foundStudent,value })
// })

// router.get('/feesupdate/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const foundStudent = await students.findById(id);

//         if (!foundStudent) {
//             return res.status(404).send('Student not found');
//         }

//         // Assuming value is passed as a simple string in the query parameter
//         const value = { _id: req.query.value };

//         // Logging the values
//         console.log(`Student Name: ${foundStudent.name}`);
//         console.log(`Value ID: ${value._id}`);

//         res.render('./fees/feeupdateform', { foundStudent, value });
//     } catch (error) {
//         console.error('Error fetching student data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// router.post('/updatefees/:id', async (req, res) => {
//     try {
//         let { id } = req.params;
//         console.log("I am from updatefees/:id route", id)
//         let { } = req.body;
//         let updatedFees = new Fees();
//         await updatedFees.save();
//         console.log(updatedFees)
//         res.redirect(`/feesupdate/${id}?value=${encodeURIComponent(updatedFees._id)}`);
//     } catch (error) {
//         console.log(error);
//     }
// })

// router.patch('/feesupdate/:id', async (req, res) => {
//     try {
//         let { id } = req.params;
//         let { month, mode } = req.body;
//         let updatedFees = await Fees.findByIdAndUpdate(id, { month, mode });
//         console.log(updatedFees);
//         res.redirect('/')
//     } catch (err) {
//         console.log(err);
//     }
// })


// router.patch('/feesupdate/:id', async (req, res) => { 
//     try {
//         let { id } = req.params;    
//         let { month, mode } = req.body;
//         console.log(`Month: ${month}, Mode: ${mode}`);

//         let foundStudent = await students.findById(id);
//         if (!foundStudent) {
//             return res.status(404).send('Student not found');
//         }

//         // Assuming you have a Fees model and `updatedFees` is being created from the request body
//         let updatedFees = new Fees({
//             student: id,
//             month: month,
//             mode: mode,
//             date: new Date() // assuming you want to save the current date
//         });

//         await updatedFees.save();
//         foundStudent.fees.push(updatedFees._id);

//         await foundStudent.save();

//         res.redirect(`/student/${id}`);
//     } catch (err) {
//         console.error(err);
//         res.redirect(`/student/${id}`);
//     }
// });


module.exports = router  