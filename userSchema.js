const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {type: String, require: true},
    address:  {type: String, require: true},
    mobileNumber:  {type: String, require: true},
    email:  {type: String, require: true, unique: true},
    password:  {type: String, require: true},
    companies: {type: [String], require: true}
})

const User = mongoose.model('User',userSchema)

module.exports = User