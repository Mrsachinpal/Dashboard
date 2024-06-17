const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin');
const passport = require('passport');


router.get("/admin/register", (req, res) => {
    try {
        res.render("./auth/register");
    } catch (err) {
        console.log(err);
    }
})
router.post('/admin/register', async (req, res) => {
    try {
        let { name, username, password } = req.body
        console.log(req.body);
        let user = await new Admin({ username, name });
        let newuser = await Admin.register(user, password)
        // req.flash('success', 'Successfully registered!')
        res.redirect('/');
    }
    catch (e) {
        console.log(e)
    }
})

router.get('/admin/login', (req, res) => {
    try {
        res.render('./auth/login');
    } catch (err) {
        console.log(err);
    }
})
router.post('/admin/login',
    passport.authenticate('local',
        {
            failureRedirect: '/',
            failureMessage: true
        }),
    function (req, res) {
        req.flash('success', `Welcome back ! `)
        res.redirect('/students')
    }
)

router.get('/logout', (req, res) => {
    {
        req.logout(() => {
            res.redirect('/')
        })
    }
})


module.exports = router;