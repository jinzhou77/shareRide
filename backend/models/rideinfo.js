var mongoose = require('mongoose');

const rideinfoSchema = mongoose.Schema({
    driverName: {type: String, required: true},
    driverEmail: String,
    passengersEmail: [String],
    departure: String,
    destination: String,
    departureTime: Number,
    hasSeats: String,
    availableSeats: Number,
    dateCreated: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false},
    versionKey: false
});

module.exports = mongoose.model('Rideinfo', rideinfoSchema);
