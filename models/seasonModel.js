const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema(
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
    lge_apps: {
      type: Number,
      default: 0,
    },
    lge_goals: {
      type: Number,
      default: 0,
    },
    fai_apps: {
      type: Number,
      default: 0,
    },
    fai_goals: {
      type: Number,
      default: 0,
    },
    mjc_apps: {
      type: Number,
      default: 0,
    },
    mjc_goals: {
      type: Number,
      default: 0,
    },
    msc_apps: {
      type: Number,
      default: 0,
    },
    msc_goals: {
      type: Number,
      default: 0,
    },
    desc_apps: {
      type: Number,
      default: 0,
    },
    desc_goals: {
      type: Number,
      default: 0,
    },
    lgec_apps: {
      type: Number,
      default: 0,
    },
    lgec_goals: {
      type: Number,
      default: 0,
    },
    reidyc_apps: {
      type: Number,
      default: 0,
    },
    reidyc_goals: {
      type: Number,
      default: 0,
    },
    hoganc_apps: {
      type: Number,
      default: 0,
    },
    hoganc_goals: {
      type: Number,
      default: 0,
    },
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
      required: [true, 'Season must belong to a player'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;
