const express = require('express');
const students = require('../model/Students');
const router = express.Router();
const multer = require('multer');
const { islogin, isListAuthor, isAuthor } = require('../middleware');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/',islogin, (req, res) => {
    try {
        res.render('index');
    } catch (e) {
        console.log(e);
    }
});

// -----filter--------
router.post('/student/filter',islogin, async (req, res) => {
    let { startDate, endDate } = req.body
    const filterstudent = await students.find({ joinDate: { $gte: startDate, $lte: endDate, } });
    // console.log(filterstudent)
    res.render('./Students/filteredStudent',{filterstudent,startDate, endDate});
})

router.post('/student/filter/seat',islogin, async (req, res) => {
    try{
    let {seat} = req.body
    console.log(req.body)
    const seatFilteredStudent=await students.find({seat: { $in: seat }})
    // console.log(seatFilteredStudent);
    // res.render('./Students/seatFilteredStudent',{seat});
    res.render('./Students/seatFilteredStudent',{seatFilteredStudent})
    }
    catch(e){
        req.flash('error',`${e}`)
        res.redirect('/students')
    }
})

router.get('/students',islogin, async (req, res) => {
    try {
        let listofStudent = await students.find({});
        // console.log(listofStudent)
        res.render('./Students/allStudent', { listofStudent })
    }
    catch (e) {
        console.log(e)
    }
})
router.get('/student/add',islogin, (req, res) => {
    try {
        res.render('./Students/addStudent')
    } catch (e) {
        console.log(e)
    }
})

router.post('/student/add',islogin, upload.single('uploadImage'), async (req, res) => {
    try {
        let { name, phone, id, address, joinDate, seat, prepration_for } = req.body;
        let uploadImage = req.file ? {
            data: req.file.buffer,
            contentType: req.file.mimetype
        } : null;

        await students.create({ name, phone, id, address, joinDate, seat, uploadImage, prepration_for })
        req.flash('success', 'Student Added Successfully')
        res.redirect('/students')
    }
    catch (e) {
        req.flash('error',`${e}`);
        console.log(e)
        res.redirect('/student/add')
    }
});

router.get('/student/:id',islogin, async (req, res) => {
    try {
        let { id } = req.params
        let foundStudent = await students.findById(id).populate('fees');
        res.render('./Students/profile', { foundStudent })
    }
    catch (e) {
        console.log(e)
        req.flash('error', `${e}`)
        res.redirect('/students')
    }
})

router.get('/student/edit/:id',islogin, async (req, res) => {
    try {
        let { id } = req.params;
        let foundStudent = await students.findById(id);
        res.render('./Students/editProfile', { foundStudent })
    }
    catch (e) {
        console.log(e)
    }
})

router.patch('/student/:Id/edit',islogin, async (req, res) => {
    try {
        let { Id } = req.params;
        let { name, phone, id, address, joinDate, seat, prepration_for } = req.body;
        await students.findByIdAndUpdate(Id, { name, phone, id, address, joinDate, seat, prepration_for })
        res.redirect(`/students`)
    }
    catch (e) {
        console.log(e)
    }

})

router.delete('/student/:id',islogin, async (req, res) => {
    try {
        console.log('hit delete route')
        let { id } = req.params;
        await students.findByIdAndDelete(id);
        req.flash('success', 'Deleted Student Entity');
        res.redirect('/students');
    }
    catch (e) {
        req.flash('error', `${e}`);
        console.log(e)
        res.redirect('/students')
    }

})



module.exports = router