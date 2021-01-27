const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    
    //Reservation also has the field of _id, which is automatically created upon generation.

    //ONE-TO-MANY: A reservation is connected to a user and a room.
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },

    //We need a way to check that this is a valid date. We need to also tell the user the correct way to enter the date.
    date: {
        type: Date,
        required: [true, "Please enter today's date or a future date for the reservation."],
    },

    adult_rsvps: {
        type: Number,
        required: [true, "Please enter the number of adult reservations."],
    },

    //This needs to be linked to reservations model.
    children_rsvps: {
        type: Number,
        required: [true, "Please enter the number of child reservations."],
    },
}, {timestamps: true});

const Reservation = mongoose.model('Reservation', ReservationSchema)

module.exports = Reservation;