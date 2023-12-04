const mongoose = require('mongoose');

const seasonBySeasonSchema = new mongoose.Schema(
  {
    season: {
      type: String,
      required: [true, 'A season must have a season year! e.g 2022/23'],
    },
    team: {
      type: String,
      enum: ['A', 'B'],
      required: [true, 'A team must be either A or B!'],
    },
    division: {
      type: String,
      enum: ['Prem', '1', '2', '2a', '2b', '3', '3a', '3b', '4'],
      required: [true, 'A division must be Prem or from 1 to 4!'],
    },
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
      required: [true, 'Season by season entry must belong to a player'],
    },
    firstName: {
      type: String,
    },
    lastName: { type: String },
    leagueGoals: {
      type: String,
    },
    totalGoals: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const SeasonBySeason = mongoose.model('SeasonBySeason', seasonBySeasonSchema);

module.exports = SeasonBySeason;
