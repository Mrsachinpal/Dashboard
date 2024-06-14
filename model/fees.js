const mongoose = require('mongoose');

const feesSchema = new mongoose.Schema({
    month: [{
        type: String,
    }],
    mode:{
        type: String, 
    },
    student: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    }
})
let Fees = mongoose.model('Fees', feesSchema);
module.exports = Fees;
