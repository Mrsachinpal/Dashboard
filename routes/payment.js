const express=require('express');
const { islogin } = require('../middleware');
const router=express.Router();
const stripe = require('stripe')('sk_test_51Oyu96SDfi9YrGDJnVQRiElnioVxb7KZ1LEOsJzo9h7MfJpoTN19HEc7RPAMU6Mq1i5gVOWWPXAqVBMft1nf1MXw00bEKKjpmo')


router.get('/payment',islogin,(req,res)=>{
    res.render('./payment/payment');
})


module.exports=router;