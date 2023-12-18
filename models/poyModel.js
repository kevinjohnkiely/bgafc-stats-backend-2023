const mongoose = require('mongoose');

const poySchema = new mongoose.Schema(
  {
    season: {
      type: String,
      required: [true, 'A season must have a season year! e.g 2022/23'],
    },
    division: {
      type: String,
      enum: [
        'Premier Division',
        'Division 1',
        'Division 2',
        'Division 2a',
        'Division 2b',
        'Division 3',
        'Division 3a',
        'Division 3b',
        'Division 4',
      ],
      required: [true, 'A division must be Prem or from 1 to 4!'],
    },
    team: {
      type: String,
      enum: ['A', 'B'],
      required: [true, 'A team must be A or B!'],
    },
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
      required: [true, 'Player of the Year entry must belong to a player'],
    },
    // seasonRef: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Season',
    // },
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

// Virtual populates
poySchema.virtual('poy_player_info', {
  ref: 'Player',
  foreignField: '_id',
  localField: 'player',
});

const POY = mongoose.model('POY', poySchema);

module.exports = POY;
