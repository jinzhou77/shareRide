var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//define user Schema
var userSchema = mongoose.Schema({
    email		: String,
    password	: String,
    name:String,
    phoneNumber: {type: String, required: true, default: '+1 217-904-3333'},
    gender: {type: String,required:true,default:''},
    dateCreated: {type: Date, default: Date.now},
    versionKey: false
});

//userSchema methods
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
