const mongoose = require('mongoose');

const haulsSchema = new mongoose.Schema(
  {
    goals: {
        type: String,
        enum: ['6', '5', '4'],
        required: [true, 'A match haul must be 4, 5 or 6 goals!']
    },
    date: {
      type: String,
      required: [true, 'A match haul must have a date!'],
    },
    matchDetails: {
      type: String,
      required: [true, 'A match haul must have game details!'],
    },
    note: {
      type: String,
    },
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
      required: [true, 'A match haul must belong to a player'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Haul = mongoose.model('Haul', haulsSchema);

module.exports = Haul;