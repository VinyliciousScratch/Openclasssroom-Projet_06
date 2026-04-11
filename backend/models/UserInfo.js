const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator').default;

const UserinfoSchema = mongoose.Schema({

    email: {type : String, required : true, unique : true},
    password: {type : String, required : true},
})

UserinfoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Userinfo', UserinfoSchema);