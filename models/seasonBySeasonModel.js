const mongoose = require('mongoose');

const seasonBySeasonSchema = new mongoose.Schema(
  {
    season: {
      type: String,
      required: [true, 'A season must have a season year! e.g 2022/23'],
    },
    division: {
      type: String,
    },
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
      required: [true, 'Season by season entry must belong to a player'],
    },
    leagueGoals: {
      type: String,
    },
    totalGoals: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populates
seasonBySeasonSchema.virtual('sbs', {
  ref: 'Player',
  foreignField: '_id',
  localField: 'player',
});

const SeasonBySeason = mongoose.model('SeasonBySeason', seasonBySeasonSchema);

module.exports = SeasonBySeason;
