const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true, // Ensure the email field is always filled
        trim: true, // Remove whitespace from the email field
    },
    name: {
        type: String,
        required: true
    }

})

adminSchema.plugin(passportLocalMongoose);

let Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
