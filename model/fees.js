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
    },
    payment:{
        type:String,
        default:"pending"
    }
})
let Fees = mongoose.model('Fees', feesSchema);
module.exports = Fees;
