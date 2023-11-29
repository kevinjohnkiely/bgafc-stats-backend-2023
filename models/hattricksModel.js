const mongoose = require('mongoose');

const hattricksSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'A hat-trick must have a date!'],
    },
    competition: {
      type: String,
      required: [true, 'A hat-trick must have a competition!'],
    },
    opponents: {
      type: String,
      required: [true, 'A hat-trick must have an opponent!'],
    },
    note: {
      type: String,
    },
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
      required: [true, 'Hat-trick must belong to a player'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Hattrick = mongoose.model('Hattrick', hattricksSchema);

module.exports = Hattrick;
