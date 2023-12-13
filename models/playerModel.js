const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const playerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'A Player must have a first name!'],
      maxlength: [25, 'A Players first name must be 25 characters or less!'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'A Player must have a last name!'],
      maxlength: [25, 'A Players last name must be 25 characters or less!'],
    },
    slug: {
      type: String,
      slug: ['firstName', 'lastName'],
      slug_padding_size: 1,
      unique: true,
    },
    dateOfBirth: {
      type: String,
      trim: true,
      maxlength: [15, 'A Players date of birth must be 15 characters or less!'],
    },
    position: {
      type: String,
      trim: true,
      maxlength: [20, 'A Players position must be 20 characters or less!'],
    },
    debut: {
      type: String,
      trim: true,
      maxlength: [150, 'A Players debut must be 150 characters or less!'],
    },
    firstGoal: {
      type: String,
      trim: true,
      maxlength: [150, 'A Players first goal must be 150 characters or less!'],
    },
    honours: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dqp0vlv6x/image/upload/v1686566180/bgafc_stats/blank.jpg',
    },
    photo: {
      type: String,
    },
    aTeamApps: {
      type: Number,
      default: 0,
    },
    aTeamGoals: {
      type: Number,
      default: 0,
    },
    bTeamApps: {
      type: Number,
      default: 0,
    },
    bTeamGoals: {
      type: Number,
      default: 0,
    },
    aTeamTotalApps: {
      type: Number,
    },
    bTeamTotalApps: {
      type: Number,
    },
    totalApps: {
      type: Number,
    },
    totalGoals: {
      type: Number,
    },
    sbs_player_info: {
      type: mongoose.Schema.ObjectId,
      ref: 'SeasonBySeason',
    },
    // the200_player_info: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'the200Club',
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populates
playerSchema.virtual('seasons', {
  ref: 'Season',
  foreignField: 'player',
  localField: '_id',
});

playerSchema.virtual('hattricks', {
  ref: 'Hattrick',
  foreignField: 'player',
  localField: '_id',
});

playerSchema.virtual('hauls', {
  ref: 'Haul',
  foreignField: 'player',
  localField: '_id',
});

playerSchema.virtual('the200Club', {
  ref: 'the200Club',
  foreignField: 'player',
  localField: '_id'
})

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
