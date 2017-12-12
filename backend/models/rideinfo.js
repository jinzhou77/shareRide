var mongoose = require('mongoose');

const rideinfoSchema = mongoose.Schema({
    driverName: String,
    driverEmail: String,
    driverGender:String,
    passengerEmail: [{type:String}],
    passengerGender:[{type:String}],
    passengerSeats:[{type:String}],
    passengerPhoneNumber:[{type:String}],
    departure: String,
    destination: String,
    departureTime: Number,
    hasSeats: String,
    availableSeats: Number,
    dateCreated: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false},
    versionKey: false,
    date: String,
    time:String,
    phoneNumber:String
});

module.exports = mongoose.model('Rideinfo', rideinfoSchema);
