const mongoose = require('mongoose');

const poySchema = new mongoose.Schema(
  {
    season: {
      type: String,
      required: [true, 'A season must have a season year! e.g 2022/23'],
    },
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
      required: [true, 'Season by season entry must belong to a player'],
    },
    seasonRef: {
      type: mongoose.Schema.ObjectId,
      ref: 'Season',
    },
    note: {
      type: String,
    },
    pic: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const POY = mongoose.model('POY', poySchema);

module.exports = POY;
